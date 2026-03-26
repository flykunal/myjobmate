export type ActivityItem = {
  id: string;
  title: string;
  detail: string;
  time: string;
};

export function ActivityFeed({ items }: { items: ActivityItem[] }) {
  const feedItems = [...items, ...items];

  return (
    <div className="activity-feed-window">
      <div className="activity-feed-track">
        {feedItems.map((item, index) => (
          <div key={`${item.id}-${index}`} className="activity-feed-item">
            <div className="activity-feed-dot" />
            <div>
              <strong>{item.title}</strong>
              <p>{item.detail}</p>
            </div>
            <span>{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}