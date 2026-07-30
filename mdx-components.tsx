import type { MDXComponents } from "mdx/types";
import { BandcampEmbed, LostMedia, MediaBlock, PlotTree, QuoteBlock, Separator, YouTubeFacade } from "@/components/content-blocks";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { BandcampEmbed, LostMedia, MediaBlock, PlotTree, QuoteBlock, Separator, YouTubeFacade, ...components };
}
