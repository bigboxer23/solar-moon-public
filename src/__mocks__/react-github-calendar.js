export default function MockGitHubCalendar(props) {
  return (
    <div
      data-testid='github-calendar'
      data-username={props.username}
      data-color={props.color}
      data-block-margin={props.blockMargin}
      data-block-size={props.blockSize}
      data-font-size={props.fontSize}
      data-hide-total-count={props.hideTotalCount}
      data-theme={JSON.stringify(props.theme)}
    >
      GitHub Calendar Mock
    </div>
  );
}
