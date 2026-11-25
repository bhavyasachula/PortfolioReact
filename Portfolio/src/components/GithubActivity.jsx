
import { GitHubContributionGraph } from "github-contrib-graph/react";
import "github-contrib-graph/styles.css";
import "./GithubActivity.css";

export default function GithubActivity() {
  return (
    <section className="github-activity">
      <GitHubContributionGraph
        username="bhavyasachula"
        theme={{
          bgColor:"#0b0b0d",
          textColor: "#a1a1aa",
          inactiveTextColor: "#52525b",
          cellLevel0: "#161b22",
          cellLevel1: "#4f0f40",
          cellLevel2: "#88236f",
          cellLevel3: "#b62d8d",
          cellLevel4: "#fb44b8",
          cellSize: 20,
          cellGap: 4,
          cellRadius: 3,
          cellBorderColor: "transparent",
          cellOutlineColor: "transparent",
          borderColor: "transparent",
          borderWidth: 0,
          cardPadding: 0,
          cardPaddingBlock: 0,
          cardRadius: 0,
          canvasPaddingTop: 4,
          canvasMarginInline: 0,
          fontFamily: "Inter, sans-serif",
        }}
        showHeader={false}
        showFooter={false}
        showThumbnail={false}
        showMonthLabels={true}
        showWeekdayLabels={true}
        showTooltips={true}
      />
    </section>
  );
}
