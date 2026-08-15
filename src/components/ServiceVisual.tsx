import type { Service } from "@/data/services";

export function ServiceVisual({service}:{service:Service}){
  return <div className={`service-visual service-visual-${service.visual}`} aria-label={`Схематичный пример интерфейса: ${service.name}`} role="img">
    <div className="sv-laptop">
      <div className="sv-screen">
        <div className="sv-nav"><i/><i/><i/><span/></div>
        {service.visual === "brand" ? <BrandPreview/> : service.visual === "product" ? <ProductPreview/> : service.visual === "shop" ? <ShopPreview/> : <WebsitePreview compact={service.visual === "mini"}/>}      
      </div>
      <div className="sv-base"/>
    </div>
    <div className="sv-phone">
      <div className="sv-phone-notch"/>
      <div className="sv-mobile-lines"><b/><b/><span/><span/><span/></div>
    </div>
  </div>
}

function WebsitePreview({compact=false}:{compact?:boolean}){return <div className="sv-site">
  <div className="sv-hero-block"><div><b/><b/><span/></div><i/></div>
  <div className="sv-pill-row"><span/><span/><span/></div>
  {!compact&&<><div className="sv-cards"><i/><i/><i/></div><div className="sv-wide"/></>}
</div>}
function ShopPreview(){return <div className="sv-shop"><div className="sv-shop-head"><b/><span/></div><div className="sv-products"><i/><i/><i/></div><div className="sv-products"><i/><i/><i/></div></div>}
function ProductPreview(){return <div className="sv-product"><aside><b/><span/><span/><span/><span/></aside><main><div className="sv-metrics"><i/><i/><i/></div><div className="sv-chart"/><div className="sv-table"><span/><span/><span/></div></main></div>}
function BrandPreview(){return <div className="sv-brand"><div className="sv-logo-demo">NX</div><div className="sv-swatches"><i/><i/><i/><i/></div><div className="sv-type-demo"><b>Aa</b><span>Digital Presence</span></div></div>}
