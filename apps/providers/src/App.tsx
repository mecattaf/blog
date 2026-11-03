import type { CSSProperties } from "react";
import data from "./data.json";
import { brands, onColor } from "./brand";

interface Provider {
  key: string;
  name: string;
  tagline: string;
  keyUrl: string;
  baseUrl: string;
  authHeader: string;
  settings: string[];
  freeTier: string;
  models: string[];
  gotcha: string;
  verified: boolean;
}

const providers = data.providers as Provider[];
const DATE = "2026-11-03";

function tileStyle(key: string): CSSProperties {
  const b = brands[key];
  const dark = b.hexDark ?? b.hex;
  return {
    "--tile-light": b.hex,
    "--tile-dark": dark,
    "--tile-fg-light": onColor(b.hex),
    "--tile-fg-dark": onColor(dark),
  } as CSSProperties;
}

function Logo({ k, size }: { k: string; size: "card" | "head" }) {
  return (
    <span
      className={`tile tile-${size}`}
      style={tileStyle(k)}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: brands[k].svg }}
    />
  );
}

function hasKey(p: Provider) {
  return p.keyUrl.startsWith("http");
}

function isAside(p: Provider) {
  return p.name.includes("(subscription aside)") || p.key === "local";
}

function shortName(p: Provider) {
  return p.name.replace(" (subscription aside)", "");
}

function Card({ p }: { p: Provider }) {
  return (
    <article className={`card${isAside(p) ? " card-aside" : ""}`} style={tileStyle(p.key)}>
      <Logo k={p.key} size="card" />
      <div className="card-body">
        <h3>
          <a href={`#${p.key}`}>{shortName(p)}</a>
        </h3>
        <p className="tagline">{p.tagline}</p>
        <p className="free">
          <span className="label">free tier:</span> {p.freeTier}
        </p>
      </div>
      {hasKey(p) ? (
        <a className="key-btn" href={p.keyUrl} target="_blank" rel="noopener noreferrer">
          {isAside(p) ? "Open usage" : "Create API key"} <span aria-hidden="true">&rarr;</span>
        </a>
      ) : (
        <span className="key-btn key-none">No key</span>
      )}
    </article>
  );
}

function Section({ p }: { p: Provider }) {
  return (
    <section className="provider" id={p.key} style={tileStyle(p.key)}>
      <h2>
        <Logo k={p.key} size="head" />
        <span>{shortName(p)}</span>
      </h2>
      <dl>
        <dt>Key page</dt>
        <dd>
          {hasKey(p) ? (
            <a href={p.keyUrl} target="_blank" rel="noopener noreferrer">
              {p.keyUrl.replace(/^https?:\/\//, "")}
            </a>
          ) : (
            <span className="muted">none</span>
          )}
          {!p.verified && hasKey(p) && (
            <span className="note"> (page not re-checked while logged out)</span>
          )}
        </dd>
        <dt>Base URL</dt>
        <dd>
          <code>{p.baseUrl}</code>
        </dd>
        <dt>Auth header</dt>
        <dd>
          <code>{p.authHeader}</code>
        </dd>
        <dt>Settings</dt>
        <dd>
          <ul>
            {p.settings.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </dd>
        <dt>Models</dt>
        <dd className="models">
          {p.models.map((m) => (
            <code key={m}>{m}</code>
          ))}
        </dd>
      </dl>
      <p className="gotcha">
        <strong>Gotcha.</strong> {p.gotcha}
      </p>
    </section>
  );
}

export default function App() {
  const apis = providers.filter((p) => !isAside(p));
  const asides = providers.filter(isAside);
  return (
    <>
      <header className="top">
        <a className="home" href="/">mecattaf.dev</a>
      </header>
      <main>
        <h1>{data.title}</h1>
        <p className="date">{DATE}</p>
        <p className="lede">{data.subtitle}</p>
        {data.intro.map((t, i) => (
          <p key={i}>{t}</p>
        ))}

        <h2 className="grid-title">API providers</h2>
        <div className="grid">
          {apis.map((p) => (
            <Card key={p.key} p={p} />
          ))}
        </div>

        <h2 className="grid-title">Not API keys, still in the mix</h2>
        <div className="grid">
          {asides.map((p) => (
            <Card key={p.key} p={p} />
          ))}
        </div>

        <h2 className="grid-title">One at a time</h2>
        {providers.map((p) => (
          <Section key={p.key} p={p} />
        ))}

        <p className="closing">{data.closing}</p>
      </main>
      <footer>
        <p>
          Provider marks are monochrome SVGs from{" "}
          <a href="https://github.com/lobehub/lobe-icons">LobeHub Icons</a> (MIT License, Copyright (c) 2023 LobeHub);
          the logos and names remain the property of their owners. Colours are each brand&rsquo;s primary.
        </p>
        <p>
          <a href="/">Back to mecattaf.dev</a> &middot; <a href="mailto:thomas@mecattaf.dev">thomas@mecattaf.dev</a>
        </p>
      </footer>
    </>
  );
}
