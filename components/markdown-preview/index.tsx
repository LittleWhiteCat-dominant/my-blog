import React, { useImperativeHandle, useEffect, useState } from 'react';
import ReactMarkdown, { Options } from 'react-markdown';
import { Element } from 'hast';
import { PluggableList } from 'unified';
import gfm from 'remark-gfm';
import raw from 'rehype-raw';
import slug from 'rehype-slug';
import headings from 'rehype-autolink-headings';
import rehypeAttrs from 'rehype-attr';
import rehypeIgnore from 'rehype-ignore';
import rehypePrism from 'rehype-prism-plus';
import rehypeRewrite, { getCodeString, RehypeRewriteOptions } from 'rehype-rewrite';
import { octiconLink } from './nodes/octiconLink';
import { copyElement } from './nodes/copy';
import { useCopied } from './plugins/useCopied';

import { reservedMeta } from './plugins/reservedMeta';
import { transitTagToLevel } from '@/utils/titleExtract';
import Outline from '../post/outline';

export interface MarkdownPreviewProps extends Omit<Options, 'children'> {
  prefixCls?: string;
  className?: string;
  source?: string;
  disableCopy?: boolean;
  style?: React.CSSProperties;
  pluginsFilter?: (type: 'rehype' | 'remark', plugin: PluggableList) => PluggableList;
  wrapperElement?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    'data-color-mode'?: 'light' | 'dark';
  };
  /**
   * Please use wrapperElement, Will be removed in v5 release.
   * @deprecated
   */
  warpperElement?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    'data-color-mode'?: 'light' | 'dark';
  };
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  onMouseOver?: (e: React.MouseEvent<HTMLDivElement>) => void;
  rehypeRewrite?: RehypeRewriteOptions['rewrite'];
  showOutline?: boolean;
}

export interface MarkdownPreviewRef extends MarkdownPreviewProps {
  mdp: React.RefObject<HTMLDivElement>;
}

export default React.forwardRef<MarkdownPreviewRef, MarkdownPreviewProps>((props, ref) => {
  const {
    prefixCls = 'wmde-markdown wmde-markdown-color',
    className,
    source,
    style,
    disableCopy = false,
    skipHtml = true,
    showOutline = false,
    onScroll,
    onMouseOver,
    pluginsFilter,
    rehypeRewrite: rewrite,
    wrapperElement = {},
    warpperElement = {},
    ...other
  } = props;
  const[heading, setHeading] = useState([]);
  const mdp = React.useRef<HTMLDivElement>(null);
  useImperativeHandle(ref, () => ({ ...props, mdp }), [mdp, props]);
  const cls = `${prefixCls || ''} ${className || ''}`;
  useCopied(mdp);

  const rehypeRewriteHandle: RehypeRewriteOptions['rewrite'] = (node, index, parent) => {
    if (node.type === 'element' && parent && parent.type === 'root' && /h(1|2|3|4|5|6)/.test(node.tagName)) {
      const child = node.children && (node.children[0] as Element);
      if (child && child.properties && child.properties.ariaHidden === 'true') {
        child.properties = { class: 'anchor', ...child.properties };
        child.children = [octiconLink];
      }
    }
    if (node.type === 'element' && node.tagName === 'pre' && !disableCopy) {
      const code = getCodeString(node.children);
      node.children.push(copyElement(code));
    }
    rewrite && rewrite(node, index, parent);
  };

  const rehypePlugins: PluggableList = [
    reservedMeta,
    [rehypePrism, { ignoreMissing: true }],
    slug,
    headings,
    rehypeIgnore,
    [rehypeRewrite, { rewrite: rehypeRewriteHandle }],
    [rehypeAttrs, { properties: 'attr' }],
    ...(other.rehypePlugins || []),
  ];
  const customProps: MarkdownPreviewProps = {
    allowElement: (element, index, parent) => {
      if (other.allowElement) {
        return other.allowElement(element, index, parent);
      }
      return /^[A-Za-z0-9]+$/.test(element.tagName);
    },
  };
  if (skipHtml) {
    rehypePlugins.push(raw);
  }
  const remarkPlugins = [...(other.remarkPlugins || []), gfm];
  const wrapperProps = { ...warpperElement, ...wrapperElement };

  useEffect(() => {
    const headings = [];
    const editorElement = document.getElementById("markdown-parent");
    editorElement.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach(heading => {
      headings.push({
        level: transitTagToLevel(heading.tagName),
        title: heading.textContent,
        id: heading.id
      })
    });
    setHeading(headings);
  }, []);

  return (
    <div id='markdown-parent' ref={mdp} onScroll={onScroll} onMouseOver={onMouseOver} {...wrapperProps} className={cls} style={style}>
      <div className='xl:grid xl:grid-cols-4 xl:gap-x-6 bg-day border-2 border-day dark:border-night dark:bg-night bg-opacity-50 dark:bg-opacity-75'>
        <div className='xl:col-span-3 xl:row-span-2 pt-10 pb-8 prose dark:prose-dark max-w-none'>
          <ReactMarkdown
            {...customProps}
            {...other}
            skipHtml={skipHtml}
            rehypePlugins={pluginsFilter ? pluginsFilter('rehype', rehypePlugins) : rehypePlugins}
            remarkPlugins={pluginsFilter ? pluginsFilter('remark', remarkPlugins) : remarkPlugins}
            children={source || ''}
          />
        </div>
        {
          showOutline? <Outline headings={heading}/> : <></>
        }
      </div>
    </div>
  );
});
