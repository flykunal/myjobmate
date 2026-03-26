import { useEffect, useMemo, useState } from "react";
import { SectionCard } from "../components/Cards";
import { api } from "../services/api";
import type { ResourceItem } from "../types";

export function ResourcesPage() {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [languageFilter, setLanguageFilter] = useState<string>("ALL");

  useEffect(() => {
    api.getResources().then(setResources);
  }, []);

  const filteredResources = useMemo(() => resources.filter((resource) => {
    const typeMatch = typeFilter === "ALL" || resource.type === typeFilter;
    const languageMatch = languageFilter === "ALL" || resource.language === languageFilter;
    return typeMatch && languageMatch;
  }), [resources, typeFilter, languageFilter]);

  const groupedResources = useMemo(() => {
    return filteredResources.reduce<Record<string, ResourceItem[]>>((accumulator, resource) => {
      const key = resource.topicKey;
      if (!accumulator[key]) {
        accumulator[key] = [];
      }
      accumulator[key].push(resource);
      return accumulator;
    }, {});
  }, [filteredResources]);

  return (
    <div className="page resources-page">
      <header className="hero resources-hero">
        <div>
          <p className="eyebrow">Resource organization layer</p>
          <h2>Free resources, mapped cleanly to the right topic at the right stage.</h2>
          <p className="muted">
            MyJobMate does not create content. It organizes free videos, notes, and projects into a roadmap that feels usable and focused.
          </p>
        </div>
      </header>

      <SectionCard title="Resource filters">
        <div className="resource-filter-bar">
          <select value={typeFilter} onChange={(event) => setTypeFilter(event.target.value)}>
            <option value="ALL">All resource types</option>
            <option value="YOUTUBE">YouTube</option>
            <option value="NOTE">Notes</option>
            <option value="PROJECT">Projects</option>
          </select>
          <select value={languageFilter} onChange={(event) => setLanguageFilter(event.target.value)}>
            <option value="ALL">All languages</option>
            <option value="ENGLISH">English</option>
            <option value="HINDI">Hindi</option>
          </select>
        </div>
      </SectionCard>

      <SectionCard title="Topic-wise resource mapping">
        <div className="resource-group-list">
          {Object.entries(groupedResources).map(([topicKey, items]) => (
            <div key={topicKey} className="resource-group-card">
              <div className="resource-group-head">
                <div>
                  <span className="eyebrow">Topic key</span>
                  <h3>{topicKey}</h3>
                </div>
                <span className="pill">{items.length} resources</span>
              </div>
              <div className="resource-card-list">
                {items.map((resource) => (
                  <article key={resource.id} className="resource-card-item">
                    <div>
                      <strong><a href={resource.url} target="_blank" rel="noreferrer">{resource.title}</a></strong>
                      <p>{resource.provider} | {resource.durationMinutes} min | {resource.difficulty}</p>
                    </div>
                    <div className="chip-row">
                      <span className="pill">{resource.type}</span>
                      <span className="pill">{resource.language}</span>
                      <span className="pill">{resource.tutorStyle}</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
