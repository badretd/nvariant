import type { MDXComponents } from "mdx/types";
import { BandcampEmbed, MediaBlock, QuoteBlock, Separator, YouTubeFacade } from "@/components/content-blocks";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { BandcampEmbed, MediaBlock, QuoteBlock, Separator, YouTubeFacade, ...components };
}
