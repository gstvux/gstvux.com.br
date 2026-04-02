import React from "react";
import { Collection, useCMS } from "tinacms";
import { titleComponent, readOnlyComponent } from "../fields/shared";

/**
 * Componente customizado para o campo 'embed'.
 * Ele reage ao campo 'kind' do mesmo item da lista.
 */
const ConditionalEmbedField = (props: any) => {
  const cms = useCMS();
  // No caso de listas, tinaForm pode estar em props ou acessível via hook
  const form = props.tinaForm;
  
  if (!form) return null;

  const nameParts = props.input.name.split(".");
  const index = parseInt(nameParts[1], 10);
  const kind = form.values.gallery?.[index]?.kind;

  if (kind !== "embed") {
    return null;
  }

  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wider">
        {props.field.label}
      </label>
      <textarea
        {...props.input}
        rows={4}
        className="block w-full px-3 py-2 text-sm text-gray-900 border border-gray-200 rounded shadow-inner focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
        placeholder="Cole aqui o snippet do <iframe> (ex: Miro, Figma, YouTube)..."
      />
      <p className="mt-1 text-[10px] text-gray-400 italic">
        Insira o código completo fornecido pela ferramenta.
      </p>
    </div>
  );
};

/**
 * Componente de Lista de Taxonomias com Autocomplete.
 * Gerencia um array de strings como "Badges" e oferece sugestões dinâmicas.
 */
const TaxonomyListField = (props: any) => {
  const [options, setOptions] = React.useState<string[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const cms: any = useCMS();

  // Carrega as opções do GraphQL (Autodescoberta)
  React.useEffect(() => {
    const fetchExistingTaxonomies = async () => {
      if (!cms?.api?.tina) return;
      try {
        const result = await cms.api.tina.request(`
          query {
            casesConnection {
              edges {
                node {
                  taxonomy
                }
              }
            }
          }
        `, {});

        const allTaxonomies = new Set<string>();
        result?.casesConnection?.edges?.forEach((edge: any) => {
          edge.node.taxonomy?.forEach((t: string) => {
            if (t) allTaxonomies.add(t);
          });
        });
        setOptions(Array.from(allTaxonomies).sort());
      } catch (err) {
        console.error("Erro ao carregar taxonomias:", err);
      }
    };
    fetchExistingTaxonomies();
  }, [cms]);

  const currentTags = Array.isArray(props.input?.value) ? props.input.value : [];

  const addTag = (tag: string) => {
    const cleanedTag = tag.trim();
    if (cleanedTag && !currentTags.includes(cleanedTag)) {
      props.input.onChange([...currentTags, cleanedTag]);
    }
    setInputValue("");
  };

  const removeTag = (indexToRemove: number) => {
    const newTags = currentTags.filter((_: any, index: number) => index !== indexToRemove);
    props.input.onChange(newTags);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(inputValue);
    }
  };

  const datalistId = `taxonomies-datalist-${props.input.name}`;

  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
        {props.field.label}
      </label>
      
      {/* Container de Tags Selecionadas */}
      <div className="flex flex-wrap gap-1.5 mb-2">
        {currentTags.map((tag: string, index: number) => (
          <span 
            key={`${tag}-${index}`}
            className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-md text-xs font-medium group transition-all"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="hover:text-blue-900 opacity-60 group-hover:opacity-100 transition-opacity"
              title="Remover"
            >
              &times;
            </button>
          </span>
        ))}
      </div>

      {/* Input de Adição com Autocomplete */}
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            // Pequeno delay para permitir clique no datalist se necessário
            setTimeout(() => {
              if (inputValue.trim() && options.includes(inputValue.trim())) {
                addTag(inputValue);
              }
            }, 200);
          }}
          list={datalistId}
          autoComplete="off"
          className="block w-full px-3 py-1.5 text-sm text-gray-900 border border-gray-200 rounded shadow-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
          placeholder="Adicionar taxonomia (Enter para confirmar)..."
        />
        <datalist id={datalistId}>
          {options.map((option) => (
            <option key={option} value={option} />
          ))}
        </datalist>
      </div>
    </div>
  );
};

export const casesCollection: Collection = {
  name: "cases",
  label: "Cases",
  path: "src/content/cases",
  format: "md",
  ui: {
    router: ({ document }) => `/cases/${document._sys.filename}`,
    filename: {
      readonly: true,
      slugify: (values) => {
        return values.title
          ?.toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_]+/g, "-")
          .replace(/^-+|-+$/g, "");
      },
    },
    beforeSubmit: async ({ values }: { values: any }) => {
      const slugify = (text: string) => 
        text
          ?.toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .replace(/[^\w\s-]/g, "")
          .replace(/[\s_]+/g, "-")
          .replace(/^-+|-+$/g, "");

      const result = {
        ...values,
        slug: values.title ? slugify(values.title) : (values.slug || ""),
      };

      if (Array.isArray(values.gallery)) {
        result.gallery = values.gallery.map((item: any) => ({
          ...item,
          embed: item?.kind === "embed" ? (item?.embed || "") : "",
        }));
      }

      return result;
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      isTitle: true,
      required: true,
      ui: {
        component: titleComponent,
      },
    },
    {
      type: "string",
      label: "Slug",
      name: "slug",
      required: true,
      ui: {
        component: readOnlyComponent,
      }
    },
    {
      type: "image",
      label: "Thumbnail",
      name: "thumbnail",
      required: true,
    },
    {
      type: "string",
      label: "Year",
      name: "year",
      options: Array.from(
        { length: new Date().getFullYear() - 2008 + 1 },
        (_, i) => (2008 + i).toString()
      ).reverse(),
      required: true,
    },
    {
      type: "string",
      label: "Client",
      name: "client",
    },
    {
      type: "string",
      label: "Partner",
      name: "partner",
    },
    {
      type: "string",
      label: "Role",
      name: "role",
      list: true,
      required: true,
    },
    {
      type: "string",
      label: "Taxonomy",
      name: "taxonomy",
      list: true,
      required: true,
      ui: {
        component: TaxonomyListField,
      } as any,
    },
    {
      type: "string",
      label: "Responsibilities",
      name: "responsibilities",
      list: true,
      required: true,
    },
    {
      type: "string",
      label: "Stack",
      name: "stack",
    },
    {
      type: "string",
      label: "Status",
      name: "status",
      options: ["draft", "ready", "published", "archived"],
    },
    {
      type: "string",
      label: "Context",
      name: "context",
      ui: { component: "textarea" },
      required: true,
    },
    {
      type: "string",
      label: "Problem",
      name: "problem",
      ui: { component: "textarea" },
      required: true,
    },
    {
      type: "string",
      label: "Constraints",
      name: "constraints",
      list: true,
    },
    {
      type: "string",
      label: "Challenge",
      name: "challenge",
      ui: { component: "textarea" },
    },
    {
      type: "string",
      label: "Solution",
      name: "solution",
      ui: { component: "textarea" },
      required: true,
    },
    {
      type: "string",
      label: "Outcomes",
      name: "outcomes",
      list: true,
    },
    {
      type: "string",
      label: "Strategy",
      name: "strategy",
      ui: { component: "textarea" },
    },
    {
      type: "string",
      label: "Interventions",
      name: "interventions",
      list: true,
    },
    {
      type: "object",
      label: "Gallery",
      name: "gallery",
      list: true,
      ui: {
        itemProps: (item) => {
          const label = item?.kind ? (item.alt ? `${item.kind}: ${item.alt}` : item.kind) : 'Gallery Item';
          return { label };
        },
      },
      fields: [
        {
          type: "string",
          label: "Kind",
          name: "kind",
          options: ["screenshot", "mockup", "before-after", "deliverable", "process", "evidence", "embed"],
        },
        {
          type: "string",
          label: "Embed Snippet",
          name: "embed",
          ui: {
            component: ConditionalEmbedField,
          } as any,
        },
        {
          type: "image",
          label: "Image",
          name: "image",
        },
        {
          type: "string",
          label: "Alt",
          name: "alt",
        },
        {
          type: "string",
          label: "Caption",
          name: "caption",
          ui: { component: "textarea" },
        },
      ],
    },
  ],
};
