// Shared client-side quiz interaction, reused across the new tutorial guides
// (Docker, AI Engineering, CI/CD, Azure Solutions Architect, Kubernetes).
// Source lessons render quizzes as static markup:
//   <div class="quiz">
//     <p class="quiz-question">…</p>
//     <ul class="quiz-options"><li data-correct="true|false">…</li>…</ul>
//     <div class="quiz-feedback" data-correct="…" data-incorrect="…"></div>
//   </div>
// This runs once per lesson mount (no DOMContentLoaded gate — the host page
// is already interactive by the time this script is injected).
export const LESSON_QUIZ_JS = `
(function initLessonQuizzes() {
  var quizzes = document.querySelectorAll('.quiz');
  quizzes.forEach(function (quiz) {
    var options = quiz.querySelectorAll('.quiz-options li');
    var feedback = quiz.querySelector('.quiz-feedback');
    var answered = false;

    options.forEach(function (option) {
      option.addEventListener('click', function () {
        if (answered) return;
        answered = true;

        var isCorrect = option.dataset.correct === 'true';

        options.forEach(function (opt) {
          opt.style.cursor = 'default';
          if (opt.dataset.correct === 'true') {
            opt.classList.add('correct');
          } else if (opt === option && !isCorrect) {
            opt.classList.add('incorrect');
          }
        });

        if (feedback) {
          feedback.classList.add('show');
          if (isCorrect) {
            feedback.classList.add('correct');
            feedback.textContent = '\\u2713 Correct! ' + (feedback.dataset.correct || '');
          } else {
            feedback.classList.add('incorrect');
            feedback.textContent = '\\u2717 Not quite. ' + (feedback.dataset.incorrect || '');
          }
        }
      });
    });
  });
})();
`;
