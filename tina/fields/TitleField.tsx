"use client";

import * as React from "react";
import { wrapFieldsWithMeta } from "tinacms";

export const TitleField = wrapFieldsWithMeta((props: any) => {
    const { input, tinaForm, form: otherForm } = props;
    const form = tinaForm || otherForm;

    return (
        <input
            {...input}
            onBlur={(e) => {
                input.onBlur(e);
                const val = e.target.value;
                if (!val) return;

                const slugified = val
                    .toLowerCase()
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "") // remove acentos
                    .replace(/ç/g, "c")             // conserta o ç explicitamente
                    .replace(/[^a-z0-9]+/g, "-")    // remove caracteres não alfanuméricos
                    .replace(/^-+|-+$/g, "");       // remove hífens extras nas pontas

                // Sincroniza sempre com o campo 'slug' para feedback visual
                if (form) {
                    form.change("slug", slugified);
                }
            }}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500"
        />
    );
});

export const ReadOnlyField = wrapFieldsWithMeta(({ input }: any) => {
    return (
        <input
            {...input}
            readOnly
            disabled
            className="w-full rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-400 cursor-not-allowed shadow-sm outline-none"
        />
    );
});
