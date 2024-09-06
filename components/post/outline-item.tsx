type Props = {
  level?: number;
  active: boolean;
  title: string;
  id: string;
};

const OutlineItem = ({ level, active, title, id }: Props) => {
  return (
    <li
      style={{
        marginLeft: (level - 1) * 10,
        marginBottom: "8px",
        marginRight: "2em",
        lineHeight: 1.3,
      }}
    >
      <a
        href={`#${id}`}
        style={{
          fontWeight: active ? 600 : "inherit",
          color: active ? "#289ef9" : "black",
          fontSize: "14px",
        }}
      >
        {title}
      </a>
    </li>
  );
};

export default OutlineItem;
