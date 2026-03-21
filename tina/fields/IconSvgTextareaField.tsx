"use client";

import * as React from "react";
import { wrapFieldsWithMeta } from "tinacms";

import { CmsIcon } from "@/components/ui/icon/CmsIcon";

export const IconSvgTextareaField = wrapFieldsWithMeta(({ input }) => {
    const value = typeof input.value === "string" ? input.value : "";

    return (
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_160px]">
            <div className="space-y-2">
                <textarea
                    id={input.name}
                    name={input.name}
                    value={value}
                    onChange={(event) => input.onChange(event.target.value)}
                    onBlur={() => input.onBlur()}
                    onFocus={() => input.onFocus()}
                    rows={12}
                    spellCheck={false}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 font-mono text-xs leading-5 text-slate-900 shadow-sm outline-none transition focus:border-slate-500"
                    placeholder='<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">...</svg>'
                />
            </div>

            <div className="space-y-2">
                <div className="text-xs font-medium text-slate-700">Preview</div>

                <div className="flex min-h-40 items-center justify-center rounded-md border border-slate-300 bg-slate-50 p-4">
                    <CmsIcon
                        svg={value}
                        className="size-12 text-slate-900"
                        fallback={
                            <div className="text-center text-xs leading-5 text-slate-500">
                                SVG inválido
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    );
});