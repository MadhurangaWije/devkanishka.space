// Lessons 72-100 (the newer "dark GitHub-style" template) reference a global
// quiz(el, correct, explain) function via inline onclick="quiz(this,'c','…')"
// attributes on .quiz-opt divs. Inlined verbatim from the trailing <script>
// found in those lesson files. Lessons 1-62 use a simpler reveal-button
// pattern (onclick="this.nextElementSibling.style.display='block'") that
// needs no JS at all, so this is a harmless no-op include for those.
export const K8S_QUIZ_JS = `
function quiz(el, correct, explain) {
  const block = el.closest('.quiz-block');
  block.querySelectorAll('.quiz-opt').forEach(o => o.style.pointerEvents = 'none');
  el.classList.add(el.dataset.val === correct ? 'correct' : 'wrong');
  if (el.dataset.val === correct) {
    block.querySelectorAll('.quiz-opt').forEach(o => { if (o.dataset.val === correct) o.classList.add('correct'); });
  }
  const exp = block.querySelector('.quiz-explain');
  exp.textContent = explain;
  exp.style.display = 'block';
}
`;
