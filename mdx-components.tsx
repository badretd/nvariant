import type { MDXComponents } from "mdx/types";
import { MediaBlock, QuoteBlock, Separator, YouTubeFacade } from "@/components/content-blocks";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { MediaBlock, QuoteBlock, Separator, YouTubeFacade, ...components };
}
