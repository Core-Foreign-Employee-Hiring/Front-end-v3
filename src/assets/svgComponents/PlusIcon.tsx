import * as React from "react";
import type { SVGProps } from "react";
const SvgPlusIcon = (props: SVGProps<SVGSVGElement>) => <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 20 20" {...props}><mask id="plus-icon_svg__a" width={20} height={20} x={0} y={0} maskUnits="userSpaceOnUse" style={{
    maskType: "alpha"
  }}><path fill="#D9D9D9" d="M0 0h20v20H0z" /></mask><g mask="url(#plus-icon_svg__a)"><path fill="#5551F5" d="M9.375 10.625H5.208a.6.6 0 0 1-.445-.18.6.6 0 0 1-.18-.446q0-.265.18-.445t.445-.18h4.167V5.209q0-.265.18-.445t.445-.18.445.18.18.445v4.167h4.167q.265 0 .445.18t.18.445-.18.445a.6.6 0 0 1-.445.18h-4.167v4.166q0 .266-.18.445a.6.6 0 0 1-.445.18.6.6 0 0 1-.445-.18.6.6 0 0 1-.18-.445z" /></g></svg>;
export default SvgPlusIcon;