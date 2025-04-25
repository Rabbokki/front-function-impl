import React, { createContext, useContext, useMemo, useId } from 'react';
import * as Recharts from 'recharts';
import { cn } from '../lib/Utils';

const THEMES = {
  light: '',
  dark: '.dark',
};

const ChartContext = createContext(null);

function useChart() {
  const context = useContext(ChartContext);
  if (!context)
    throw new Error('useChart must be used within a <ChartContainer />');
  return context;
}

function ChartContainer({ id, className, children, config, ...props }) {
  const uniqueId = useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, '')}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        data-chart={chartId}
        className={cn('flex aspect-video justify-center text-xs', className)}
        {...props}
      >
        <ChartStyle id={chartId} config={config} />
        <Recharts.ResponsiveContainer>{children}</Recharts.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
}

function ChartStyle({ id, config }) {
  const colorConfig = Object.entries(config).filter(
    ([_, item]) => item.theme || item.color
  );

  if (!colorConfig.length) return null;

  const styles = Object.entries(THEMES)
    .map(([theme, prefix]) => {
      const vars = colorConfig
        .map(([key, item]) => {
          const color = item.theme?.[theme] || item.color;
          return color ? `  --color-${key}: ${color};` : null;
        })
        .filter(Boolean)
        .join('\n');
      return `${prefix} [data-chart=${id}] {\n${vars}\n}`;
    })
    .join('\n');

  return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}

function ChartTooltip(props) {
  return <Recharts.Tooltip {...props} />;
}

function ChartTooltipContent({
  active,
  payload,
  className,
  indicator = 'dot',
  hideLabel = false,
  hideIndicator = false,
  label,
  labelFormatter,
  labelClassName,
  formatter,
  color,
  nameKey,
  labelKey,
}) {
  const { config } = useChart();

  const tooltipLabel = useMemo(() => {
    if (hideLabel || !payload?.length) return null;
    const [item] = payload;
    const key = labelKey || item.dataKey || item.name || 'value';
    const itemConfig = getPayloadConfigFromPayload(config, item, key);

    const labelText =
      !labelKey && typeof label === 'string'
        ? config[label]?.label || label
        : itemConfig?.label;

    if (labelFormatter) {
      return (
        <div className={cn('font-medium', labelClassName)}>
          {labelFormatter(labelText, payload)}
        </div>
      );
    }

    return labelText ? (
      <div className={cn('font-medium', labelClassName)}>{labelText}</div>
    ) : null;
  }, [
    label,
    labelFormatter,
    payload,
    hideLabel,
    labelClassName,
    config,
    labelKey,
  ]);

  if (!active || !payload?.length) return null;

  const nestLabel = payload.length === 1 && indicator !== 'dot';

  return (
    <div
      className={cn(
        'grid min-w-[8rem] items-start gap-1.5 rounded-lg border bg-background px-2.5 py-1.5 text-xs shadow-xl',
        className
      )}
    >
      {!nestLabel ? tooltipLabel : null}
      <div className="grid gap-1.5">
        {payload.map((item, index) => {
          const key = nameKey || item.name || item.dataKey || 'value';
          const itemConfig = getPayloadConfigFromPayload(config, item, key);
          const indicatorColor = color || item.payload.fill || item.color;

          return (
            <div
              key={item.dataKey}
              className={cn('flex w-full flex-wrap items-center gap-2')}
            >
              {!hideIndicator && (
                <div
                  className={cn('rounded-[2px]', {
                    'h-2.5 w-2.5': indicator === 'dot',
                    'w-1': indicator === 'line',
                    'w-0 border border-dashed bg-transparent':
                      indicator === 'dashed',
                  })}
                  style={{
                    backgroundColor: indicatorColor,
                    borderColor: indicatorColor,
                  }}
                />
              )}
              <div className="flex flex-1 justify-between items-center">
                <div>
                  {nestLabel ? tooltipLabel : null}
                  <span className="text-muted-foreground">
                    {itemConfig?.label || item.name}
                  </span>
                </div>
                {item.value !== undefined && (
                  <span className="font-mono font-medium">
                    {item.value.toLocaleString()}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChartLegend(props) {
  return <Recharts.Legend {...props} />;
}

function ChartLegendContent({
  className,
  hideIcon = false,
  payload,
  verticalAlign = 'bottom',
  nameKey,
}) {
  const { config } = useChart();
  if (!payload?.length) return null;

  return (
    <div
      className={cn(
        'flex items-center justify-center gap-4',
        verticalAlign === 'top' ? 'pb-3' : 'pt-3',
        className
      )}
    >
      {payload.map((item) => {
        const key = nameKey || item.dataKey || 'value';
        const itemConfig = getPayloadConfigFromPayload(config, item, key);

        return (
          <div key={item.value} className="flex items-center gap-1.5">
            {!hideIcon &&
              (itemConfig?.icon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="h-2 w-2 shrink-0 rounded-[2px]"
                  style={{ backgroundColor: item.color }}
                />
              ))}
            {itemConfig?.label}
          </div>
        );
      })}
    </div>
  );
}

function getPayloadConfigFromPayload(config, payload, key) {
  const payloadPayload = payload?.payload;
  let labelKey = key;

  if (payload && typeof payload[key] === 'string') {
    labelKey = payload[key];
  } else if (payloadPayload && typeof payloadPayload[key] === 'string') {
    labelKey = payloadPayload[key];
  }

  return config[labelKey] || config[key];
}

export {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
};
