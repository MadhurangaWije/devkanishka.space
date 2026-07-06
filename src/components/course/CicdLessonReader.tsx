type Props = {
  bodyHtml: string;
};

export function CicdLessonReader({ bodyHtml }: Props) {
  return (
    <div className="cicd-lesson-host">
      <div dangerouslySetInnerHTML={{ __html: bodyHtml }} />
    </div>
  );
}
