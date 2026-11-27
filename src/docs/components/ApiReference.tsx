import { ArrowSquareOut, Cube, Link as LinkIcon, Package } from '@phosphor-icons/react'
import { HueTag } from '@/components/ui/hue-tag'
import { Link } from '@/docs/router'
import type { ComponentDocMeta } from '@/docs/data/catalog'

export interface ApiReferenceProps {
  component: ComponentDocMeta
}

export function ApiReference({ component }: ApiReferenceProps) {
  const { api, dataAttributes, cssVars, baseUiUrl, baseUiPackage, dependencies, registryDependencies } =
    component

  return (
    <section id="api-reference" className="flex flex-col gap-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E8EE] pb-2.5">
        <h2 className="m-0 font-glaze-display text-[20px] font-extrabold text-[#1B1F27]">
          API
        </h2>
        {baseUiUrl && (
          <a
            href={baseUiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-[#E4E6FD] px-3 py-1 text-[12px] font-semibold text-[#262B7A] no-underline hover:opacity-85"
          >
            <span>{baseUiPackage}</span>
            <ArrowSquareOut size={13} weight="bold" />
          </a>
        )}
      </div>

      {api.exportedComponents.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {api.exportedComponents.map((part) => (
            <span
              key={part}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 font-glaze-mono text-[12px] font-semibold text-[#123A5C]"
            >
              <Cube size={13} className="text-[#7B80EA]" />
              {part}
            </span>
          ))}
        </div>
      )}

      {api.sections.map((sec) => (
        <div key={sec.name} className="flex flex-col gap-2.5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3
              id={`api-${sec.name.toLowerCase()}`}
              className="m-0 font-glaze-mono text-[15px] font-bold text-[#123A5C]"
            >
              {`<${sec.name} />`}
            </h3>
            {sec.extends && (
              <span className="font-glaze-mono text-[11px] text-[#8A90A0]">
                extends {sec.extends}
              </span>
            )}
          </div>

          {sec.props.length > 0 ? (
            <div className="overflow-x-auto rounded-[18px] bg-white">
              <table className="w-full border-collapse text-left text-[13px]">
                <thead>
                  <tr className="border-b border-[#EEF0F3] text-[12px] font-semibold text-[#6B7280]">
                    <th className="px-4 py-2.5">Prop</th>
                    <th className="px-4 py-2.5">Type</th>
                    <th className="px-4 py-2.5">Default</th>
                    <th className="px-4 py-2.5">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F2F3F5]">
                  {sec.props.map((prop) => (
                    <tr key={prop.name} className="align-top hover:bg-[#F9FAFC]">
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        <code className="rounded bg-[#F3F4FE] px-1.5 py-0.5 font-glaze-mono text-[12px] font-semibold text-[#4A4FB8]">
                          {prop.name}
                        </code>
                        {prop.required && (
                          <span className="ml-1 text-[11px] font-bold text-[#E5603B]">*</span>
                        )}
                      </td>
                      <td className="px-4 py-2.5">
                        <code className="font-glaze-mono text-[12px] text-[#24557F] break-words">
                          {prop.type}
                        </code>
                      </td>
                      <td className="px-4 py-2.5 whitespace-nowrap">
                        {prop.defaultValue ? (
                          <code className="rounded bg-[#F2F3F5] px-1.5 py-0.5 font-glaze-mono text-[12px] text-[#1B1F27]">
                            {prop.defaultValue}
                          </code>
                        ) : (
                          <span className="text-[#8A90A0]">—</span>
                        )}
                      </td>
                      <td className="px-4 py-2.5 text-[#5B6170]">{prop.description || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="rounded-[16px] bg-white px-4 py-3 text-[13px] text-[#6B7280]">
              透传底层 Base UI / HTML 属性
              {baseUiUrl && (
                <>
                  {' · '}
                  <a
                    href={baseUiUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-[#4A4FB8] no-underline hover:underline"
                  >
                    Base UI API →
                  </a>
                </>
              )}
            </div>
          )}
        </div>
      ))}

      {api.helperInterfaces.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 id="api-types" className="m-0 text-[14px] font-bold text-[#1B1F27]">
            Types
          </h3>
          {api.helperInterfaces.map((iface) => (
            <div key={iface.name} className="overflow-x-auto rounded-[18px] bg-white">
              <div className="border-b border-[#EEF0F3] px-4 py-2 font-glaze-mono text-[12px] font-bold text-[#123A5C]">
                {iface.name}
              </div>
              <table className="w-full border-collapse text-left text-[13px]">
                <tbody className="divide-y divide-[#F2F3F5]">
                  {iface.props.map((p) => (
                    <tr key={p.name}>
                      <td className="w-44 px-4 py-2 font-glaze-mono text-[12px] font-semibold text-[#4A4FB8]">
                        {p.name}
                        {p.required ? '*' : '?'}
                      </td>
                      <td className="px-4 py-2 font-glaze-mono text-[12px] text-[#24557F]">
                        {p.type}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}

      {api.typeAliases.length > 0 && (
        <div className="flex flex-col gap-1.5 rounded-[18px] bg-white p-4">
          {api.typeAliases.map((t) => (
            <div key={t.name} className="flex flex-wrap items-baseline gap-2 text-[12px]">
              <code className="font-glaze-mono font-bold text-[#4A4FB8]">{t.name}</code>
              <span className="text-[#8A90A0]">=</span>
              <code className="font-glaze-mono text-[#24557F]">{t.definition}</code>
            </div>
          ))}
        </div>
      )}

      {dataAttributes.length > 0 && (
        <div id="data-attributes" className="flex flex-col gap-2.5">
          <h3 className="m-0 text-[14px] font-bold text-[#1B1F27]">Data Attributes</h3>
          <div className="overflow-x-auto rounded-[18px] bg-white">
            <table className="w-full border-collapse text-left text-[13px]">
              <tbody className="divide-y divide-[#F2F3F5]">
                {dataAttributes.map((da) => (
                  <tr key={da.attr}>
                    <td className="w-56 px-4 py-2.5">
                      <code className="rounded bg-[#EEF7FD] px-1.5 py-0.5 font-glaze-mono text-[12px] font-semibold text-[#24557F]">
                        {da.attr}
                      </code>
                    </td>
                    <td className="px-4 py-2.5 text-[#5B6170]">{da.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {cssVars.length > 0 && (
        <div id="css-variables" className="flex flex-col gap-2">
          <h3 className="m-0 text-[14px] font-bold text-[#1B1F27]">CSS Variables</h3>
          <div className="flex flex-wrap gap-1.5">
            {cssVars.map((cv) => (
              <code
                key={cv}
                className="rounded-full bg-white px-3 py-1 font-glaze-mono text-[12px] font-semibold text-[#17625B]"
              >
                {cv}
              </code>
            ))}
          </div>
        </div>
      )}

      <div id="registry-dependencies" className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="flex flex-col gap-2 rounded-[18px] bg-white p-4">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#6B7280]">
            <Package size={14} /> NPM
          </span>
          <div className="flex flex-wrap gap-1.5">
            {dependencies.length > 0 ? (
              dependencies.map((d) => (
                <HueTag key={d} hue="sky" size="xs">
                  {d}
                </HueTag>
              ))
            ) : (
              <span className="text-[12px] text-[#8A90A0]">—</span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-[18px] bg-white p-4">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-semibold text-[#6B7280]">
            <LinkIcon size={14} /> Registry
          </span>
          <div className="flex flex-wrap gap-1.5">
            {registryDependencies.length > 0 ? (
              registryDependencies.map((d) => {
                const slug = d.replace(/^@glaze\//, '')
                const isUi = !['style', 'tokens', 'motion'].includes(slug)
                return isUi ? (
                  <Link key={d} to={`/docs/components/${slug}`} className="no-underline">
                    <HueTag hue="periwinkle" size="xs">
                      {d}
                    </HueTag>
                  </Link>
                ) : (
                  <HueTag key={d} hue="aqua" size="xs">
                    {d}
                  </HueTag>
                )
              })
            ) : (
              <span className="text-[12px] text-[#8A90A0]">—</span>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
