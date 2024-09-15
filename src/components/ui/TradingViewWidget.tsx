import React, { useRef, useEffect, memo } from 'react';

//interface TradingViewWidgetProps {
 // symbol: string,
//}

interface TradingViewWidgetProps {
  symbolInfo: [symbol:string, interval: string, timeZone: string]
}

//interface TradingViewWidgetProps {
//  symbolInfo: [symbol:string]
//}

const TradingViewWidget: React.FC<TradingViewWidgetProps> = ({ symbolInfo }) => {
  const container = useRef<HTMLDivElement>(null);
  const [symbol, interval, timeZone] = symbolInfo;
  useEffect(() => {
    if (!container.current) return;

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: symbol,
      interval: interval,
      timezone:  timeZone,
      theme: "dark",
      style: "1",
      locale: "en",
      withdateranges: true,
      hide_side_toolbar: false,
      allow_symbol_change: true,
      calendar: false,
      support_host: "https://www.tradingview.com"
    });
    container.current.appendChild(script);

    return () => {
      if (container.current) {
        container.current.innerHTML = ''; // Clean up the container
      }
    };
  }, [symbol]);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: '100%', width: '100%' }}>
      <div className="tradingview-widget-container__widget" style={{ height: '100%', width: '100%' }}></div>
    </div>
  );
};

export default memo(TradingViewWidget);
