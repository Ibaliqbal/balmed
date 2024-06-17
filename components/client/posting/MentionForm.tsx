"use client";
import Image from "next/image";
import {
  Mention,
  MentionItemTemplateOptions,
  MentionSearchEvent,
} from "primereact/mention";
import React from "react";

type Props<TData> = {
  field: string;
  data: TData[];
  dataHastags: string[];
  next: Function;
  nextHastags: Function;
};

const MentionForm = <TData,>({
  field,
  data,
  next,
  nextHastags,
  dataHastags,
}: Props<TData>) => {
  const [multipleSuggestions, setMultipleSuggestions] = React.useState<TData[]>(
    []
  );
  const onSearch = (event: MentionSearchEvent) => {
    const trigger = event.trigger;
    if (trigger === "@") {
      //in a real application, make a request to a remote url with the query and return suggestions, for demo we filter at client side
      setTimeout(() => {
        const query = event.query;
        let suggestion;

        if (!query.trim().length) {
          suggestion = [...data];
        } else {
          suggestion = next(query);
        }

        setMultipleSuggestions(suggestion);
      }, 250);
    } else if (trigger === "#") {
      setTimeout(() => {
        const query = event.query;
        let suggestions;

        if (!query.trim().length) {
          suggestions = [...dataHastags];
        } else {
          suggestions = nextHastags(query);
        }

        setMultipleSuggestions(suggestions);
      }, 250);
    }
  };

  const itemTemplate = (suggestion: any) => {
    return (
      <div className="flex items-center gap-4 cursor-pointer hover:bg-slate-300 py-4 px-2">
        <Image
          alt={suggestion.name}
          src={suggestion.image}
          width={40}
          height={40}
          className="rounded-full w-[40px] h-[40px]"
        />
        <span className="flex flex-col text-black">
          {suggestion.name}
          <small
            style={{ fontSize: ".75rem", color: "var(--text-color-secondary)" }}
          >
            @{suggestion.username}
          </small>
        </span>
      </div>
    );
  };

  const multipleItemTemplate = (
    suggestion: any,
    options: MentionItemTemplateOptions
  ) => {
    const trigger = options.trigger;

    if (trigger === "@" && suggestion.name) {
      return itemTemplate(suggestion);
    } else if (trigger === "#" && !suggestion.name) {
      return (
        <article className="w-full hover:bg-slate-300 cursor-pointer px-1 py-3">
          <p className="text-black text-lg ">{suggestion}</p>
        </article>
      );
    }

    return null;
  };

  return (
    <div className="flex justify-center w-full">
      <Mention
        placeholder="Enter @ to mention people, # to mention hastag and use uniqe characters"
        ptOptions={{ mergeSections: false }}
        pt={{
          input: { className: "resize-none w-full h-48" },
          items: {
            className:
              "bg-white flex flex-col gap-5 w-[380px] overflow-auto max-h-[200px] p-2",
          },
          root: { className: " w-full h-48" },
        }}
        name="mentions"
        suggestions={multipleSuggestions}
        itemTemplate={multipleItemTemplate}
        onSearch={onSearch}
        field={[field]}
        trigger={["@", "#"]}
      />
    </div>
  );
};

export default MentionForm;
