import { useEffect, useState } from "react";
import { SectionCard } from "../components/Cards";
import { api } from "../services/api";
import type { ResourceItem } from "../types";

export function ResourcesPage() {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  useEffect(() => { api.getResources().then(setResources); }, []);

  return (
    <div className="page">
      <SectionCard title="Topic-wise resource mapping">
        <div className="table-wrap">
          <table>
            <thead><tr><th>Title</th><th>Type</th><th>Language</th><th>Tutor style</th><th>Duration</th></tr></thead>
            <tbody>
              {resources.map((resource) => (
                <tr key={resource.id}>
                  <td><a href={resource.url} target="_blank" rel="noreferrer">{resource.title}</a></td>
                  <td>{resource.type}</td>
                  <td>{resource.language}</td>
                  <td>{resource.tutorStyle}</td>
                  <td>{resource.durationMinutes} min</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SectionCard>
    </div>
  );
}
