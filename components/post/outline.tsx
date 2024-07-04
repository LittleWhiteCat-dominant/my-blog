import * as React from "react";
import useWindowScrollPosition from "@/hooks/useWindowScrollPosition";
import OutlineItem from "./outline-item";

const HEADING_OFFSET = 20;

type Props = {
    headings: {
        title: string;
        level: number;
        id: string;
      }[];
  }

const Outline = ({ headings }: Props) => {
  const [activeSlug, setActiveSlug] = React.useState<string>();
  const position = useWindowScrollPosition({
    throttle: 100,
  });

  React.useEffect(() => {
    for (let key = 0; key < headings.length; key++) {
      const heading = headings[key];
      const element = window.document.getElementById(
        decodeURIComponent(heading.id)
      );

      if (element) {
        const bounding = element.getBoundingClientRect();

        if (bounding.top > HEADING_OFFSET) {
          const last = headings[Math.max(0, key - 1)];
          setActiveSlug(last.id);
          return;
        }
      }
    }
  }, [position, headings]);

  // calculate the minimum heading level and adjust all the headings to make
  // that the top-most. This prevents the contents from being weirdly indented
  // if all of the headings in the document are level 3, for example.
  const minHeading = headings.reduce(
    (memo, heading) => (heading.level < memo ? heading.level : memo),
    Infinity
  );
  const headingAdjustment = minHeading - 1;

  return (
    <div className="hidden xl:block sticky top-4 xl:top-8 pt-10 pb-8 max-h-fit min-w-min min-h-fit overflow-y-auto rounded-sm">
    <div className="text-xl font-semibold">{"On this page"}</div>
    {headings.length ? (
      <ul className="p-0 list-none">
        {headings
          .filter((heading) => heading.level < 4)
          .map((heading) => (
            <OutlineItem 
              key={heading.id}
              level={heading.level - headingAdjustment}
              active={activeSlug === heading.id}
              title={heading.title}
              id={heading.id} />
          ))}
      </ul>
    ) : (
      <text style={{ fontSize: '14px', margin: '1em 0 4em', paddingRight: '2em'}}>
        {"Headings you add to the document will appear here"}
      </text>
    )}
  </div>
  );
  }
  
  export default Outline;