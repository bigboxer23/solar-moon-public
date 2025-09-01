export default function MockGitHubCalendar(props) {
  return (
    <div
      data-block-margin={props.blockMargin}
      data-block-size={props.blockSize}
      data-color={props.color}
      data-font-size={props.fontSize}
      data-hide-total-count={props.hideTotalCount}
      data-testid='github-calendar'
      data-theme={JSON.stringify(props.theme)}
      data-username={props.username}
    >
      GitHub Calendar Mock
    </div>
  );
}
