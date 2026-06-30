import fs from 'fs';
import path from 'path';
import type { LessonMeta, PhaseMeta } from '@/lib/backend-course';

export type { LessonMeta as MLLessonMeta, PhaseMeta as MLPhaseMeta };

export type MLLessonData = LessonMeta & {
  phaseNumber: number;
  phaseName: string;
  bodyHtml: string;
  script: string;
  prev: { slug: string; title: string; urlSegment: string } | null;
  next: { slug: string; title: string; urlSegment: string } | null;
};

// ── Phase definitions ──────────────────────────────────────────────────────

export const ML_PHASES: PhaseMeta[] = [
  {
    number: 1,
    name: 'Phase 1 — Data Science Foundations',
    urlSegment: 'phase-1',
    contentDir: 'ml-mastery',
    lessons: [
      { slug: 'numpy-arrays-fundamentals',     title: 'NumPy Arrays & Shapes',            subtitle: 'The backbone of every ML library — how Python represents numbers at speed, and why it matters for every algorithm you\'ll ever build.', number: 1,  file: '0001-numpy-arrays-fundamentals.html' },
      { slug: 'numpy-operations-broadcasting', title: 'NumPy Operations & Broadcasting',   subtitle: 'How NumPy does math on millions of numbers at once — the engine behind matrix multiplication, gradient computation, and feature normalization.', number: 2,  file: '0002-numpy-operations-broadcasting.html' },
      { slug: 'pandas-dataframes',             title: 'Pandas DataFrames & Series',        subtitle: 'The tool every ML engineer uses to load, inspect, and understand raw data — before any model is trained.', number: 3,  file: '0003-pandas-dataframes.html' },
      { slug: 'pandas-data-cleaning',          title: 'Pandas Data Cleaning & EDA',        subtitle: 'The work that makes or breaks every ML project — handling missing values, fixing data types, and extracting insights before you touch a model.', number: 4,  file: '0004-pandas-data-cleaning.html' },
      { slug: 'data-visualization',            title: 'Data Visualization',                subtitle: 'Communicating patterns visually — Matplotlib, Seaborn, and the chart types that reveal what tables can\'t.', number: 5,  file: '0005-data-visualization.html' },
      { slug: 'statistics-descriptive',        title: 'Descriptive Statistics',             subtitle: 'Measuring what\'s typical and how spread out values are — the statistical vocabulary every ML practitioner needs before fitting a model.', number: 6,  file: '0006-statistics-descriptive.html' },
      { slug: 'probability-distributions',     title: 'Probability Distributions',          subtitle: 'The mathematical models of randomness — how distributions describe data, and why Gaussian, Bernoulli, and Poisson appear everywhere in ML.', number: 7,  file: '0007-probability-distributions.html' },
      { slug: 'linear-algebra',                title: 'Linear Algebra for ML',              subtitle: 'Vectors, matrices, and the operations that power every ML algorithm — dot products, matrix multiplication, and the geometric intuition behind them.', number: 8,  file: '0008-linear-algebra.html' },
      { slug: 'ml-project-lifecycle',          title: 'The ML Project Lifecycle',           subtitle: 'The end-to-end workflow of a real ML project — problem framing, data collection, modelling, evaluation, and the production handoff.', number: 9,  file: '0009-ml-project-lifecycle.html' },
    ],
  },
  {
    number: 2,
    name: 'Phase 2 — Classical Machine Learning',
    urlSegment: 'phase-2',
    contentDir: 'ml-mastery',
    lessons: [
      { slug: 'data-preprocessing',              title: 'Data Preprocessing',                   subtitle: 'Transforming raw features into model-ready inputs — scaling, encoding, imputation, and the decisions that determine whether your model trains at all.', number: 10, file: '0010-data-preprocessing.html' },
      { slug: 'linear-regression',               title: 'Linear Regression',                    subtitle: 'Predicting continuous values by fitting a line to data — the simplest supervised learning algorithm and the foundation of nearly everything that follows.', number: 11, file: '0011-linear-regression.html' },
      { slug: 'gradient-descent',                title: 'Gradient Descent',                     subtitle: 'The optimisation engine behind every ML model — how moving opposite the gradient finds the minimum loss, step by step.', number: 12, file: '0012-gradient-descent.html' },
      { slug: 'polynomial-regression',           title: 'Polynomial Regression',                subtitle: 'Fitting curves instead of lines — when to go beyond linear models, and how to avoid overfitting when you do.', number: 13, file: '0013-polynomial-regression.html' },
      { slug: 'bias-variance-tradeoff',          title: 'Bias-Variance Tradeoff',               subtitle: 'The fundamental tension in every ML model — understanding underfitting, overfitting, and how model complexity determines where you land.', number: 14, file: '0014-bias-variance-tradeoff.html' },
      { slug: 'logistic-regression',             title: 'Logistic Regression',                  subtitle: 'Predicting probabilities and class membership — the log-odds model that is still the first thing every practitioner reaches for in binary classification.', number: 15, file: '0015-logistic-regression.html' },
      { slug: 'knn',                             title: 'K-Nearest Neighbours',                 subtitle: 'Classifying by proximity — how KNN works, when it excels, and why it breaks down at scale.', number: 16, file: '0016-knn.html' },
      { slug: 'naive-bayes',                     title: 'Naive Bayes',                          subtitle: 'Probabilistic classification using Bayes\' theorem — a surprisingly fast and effective algorithm that assumes feature independence and gets away with it.', number: 17, file: '0017-naive-bayes.html' },
      { slug: 'svm',                             title: 'Support Vector Machines',              subtitle: 'Finding the maximum-margin boundary between classes — the kernel trick, support vectors, and why SVMs still win on small high-dimensional datasets.', number: 18, file: '0018-svm.html' },
      { slug: 'model-evaluation-1',              title: 'Model Evaluation I',                   subtitle: 'Measuring classification performance beyond accuracy — precision, recall, F1, ROC-AUC, and the metrics that actually matter for your problem.', number: 19, file: '0019-model-evaluation-1.html' },
      { slug: 'model-evaluation-2',              title: 'Model Evaluation II',                  subtitle: 'Cross-validation, train-test split strategies, and the data leakage pitfalls that make offline metrics lie about production performance.', number: 20, file: '0020-model-evaluation-2.html' },
      { slug: 'regularization',                  title: 'Regularization',                       subtitle: 'Penalising model complexity to prevent overfitting — L1, L2, and elastic net regularisation, and how to choose the strength of the penalty.', number: 21, file: '0021-regularization.html' },
      { slug: 'decision-trees',                  title: 'Decision Trees',                       subtitle: 'Learning by asking yes/no questions — how trees split data, measure impurity, and overfit if you let them grow too deep.', number: 22, file: '0022-decision-trees.html' },
      { slug: 'ensemble-methods',                title: 'Ensemble Methods',                     subtitle: 'Combining weak learners into a strong predictor — bagging, Random Forests, and the wisdom-of-crowds principle that makes ensembles hard to beat.', number: 23, file: '0023-ensemble-methods.html' },
      { slug: 'boosting',                        title: 'Boosting & XGBoost',                   subtitle: 'Training models sequentially to correct each other\'s errors — AdaBoost, Gradient Boosting, and the XGBoost implementation that wins most tabular competitions.', number: 24, file: '0024-boosting.html' },
      { slug: 'feature-engineering',             title: 'Feature Engineering',                  subtitle: 'Creating the inputs that make models smarter — encoding, interactions, aggregations, and the domain knowledge that raw features can\'t capture alone.', number: 25, file: '0025-feature-engineering.html' },
      { slug: 'imbalanced-datasets',             title: 'Imbalanced Datasets',                  subtitle: 'Training on data where one class is rare — SMOTE, class weighting, threshold tuning, and why accuracy is the wrong metric when classes are skewed.', number: 26, file: '0026-imbalanced-datasets.html' },
      { slug: 'hyperparameter-tuning',           title: 'Hyperparameter Tuning',                subtitle: 'Systematically searching for the best model configuration — grid search, random search, and Bayesian optimisation.', number: 27, file: '0027-hyperparameter-tuning.html' },
      { slug: 'kmeans-clustering',               title: 'K-Means Clustering',                   subtitle: 'Partitioning data into groups without labels — how K-Means initialises, converges, and how to choose K when no one tells you.', number: 28, file: '0028-kmeans-clustering.html' },
      { slug: 'hierarchical-dbscan-clustering',  title: 'Hierarchical & DBSCAN Clustering',     subtitle: 'Clustering without specifying K — hierarchical agglomeration for dendrogram-based grouping, and DBSCAN for finding clusters of arbitrary shape.', number: 29, file: '0029-hierarchical-dbscan-clustering.html' },
      { slug: 'pca',                             title: 'Principal Component Analysis',         subtitle: 'Reducing dimensions while preserving variance — PCA as a preprocessing step, a visualisation tool, and a way to understand what your data is really about.', number: 30, file: '0030-pca.html' },
      { slug: 'tsne-umap',                       title: 't-SNE & UMAP',                         subtitle: 'Visualising high-dimensional data in 2D — t-SNE and UMAP for embedding exploration, and the interpretability traps that come with them.', number: 31, file: '0031-tsne-umap.html' },
      { slug: 'anomaly-detection',               title: 'Anomaly Detection',                    subtitle: 'Finding the unusual without labelled anomalies — Isolation Forest, One-Class SVM, and statistical approaches for detecting outliers in production.', number: 32, file: '0032-anomaly-detection.html' },
      { slug: 'recommendation-systems',          title: 'Recommendation Systems',               subtitle: 'Personalising at scale — collaborative filtering, matrix factorisation, and the content-based approaches behind every "you might also like" system.', number: 33, file: '0033-recommendation-systems.html' },
      { slug: 'time-series-analysis',            title: 'Time Series Analysis',                 subtitle: 'Understanding data that changes over time — trends, seasonality, stationarity, and the autocorrelation structure that makes time series different from tabular data.', number: 34, file: '0034-time-series-analysis.html' },
      { slug: 'time-series-forecasting',         title: 'Time Series Forecasting',              subtitle: 'Predicting the future from the past — ARIMA, Prophet, and gradient boosting on lag features, with the evaluation pitfalls specific to time-ordered data.', number: 35, file: '0035-time-series-forecasting.html' },
    ],
  },
  {
    number: 3,
    name: 'Phase 3 — Deep Learning Fundamentals',
    urlSegment: 'phase-3',
    contentDir: 'ml-mastery',
    lessons: [
      { slug: 'dl-vs-ml',                       title: 'Deep Learning vs Classical ML',        subtitle: 'When deep learning beats classical ML and when it doesn\'t — the conditions under which neural networks earn their compute cost.', number: 36, file: '0036-dl-vs-ml.html' },
      { slug: 'neural-network-intuition',        title: 'Neural Network Intuition',             subtitle: 'How neurons, layers, and activations combine to learn any function — the mathematical intuition behind the universal approximation theorem.', number: 37, file: '0037-neural-network-intuition.html' },
      { slug: 'pytorch-tensors-autograd',        title: 'PyTorch: Tensors & Autograd',         subtitle: 'PyTorch fundamentals — tensors as the universal data structure, autograd for tracking gradients, and the computation graph that makes training possible.', number: 38, file: '0038-pytorch-tensors-autograd.html' },
      { slug: 'backpropagation',                 title: 'Backpropagation',                      subtitle: 'The algorithm that trains every neural network — how gradients flow backwards through layers via the chain rule, computed automatically by modern frameworks.', number: 39, file: '0039-backpropagation.html' },
      { slug: 'gradient-descent-variants',       title: 'Gradient Descent Variants',            subtitle: 'Beyond vanilla gradient descent — mini-batch SGD, momentum, and the intuition for why the update rule matters as much as the architecture.', number: 40, file: '0040-gradient-descent-variants.html' },
      { slug: 'pytorch-datasets-dataloaders',    title: 'PyTorch: Datasets & DataLoaders',     subtitle: 'Loading and batching training data in PyTorch — Dataset, DataLoader, and the transforms pipeline that feeds your network efficiently.', number: 41, file: '0041-pytorch-datasets-dataloaders.html' },
      { slug: 'optimizers',                      title: 'Optimizers: Adam, SGD & More',        subtitle: 'Adam, SGD with momentum, and RMSProp — how adaptive learning rate optimisers keep training stable without manual schedule tuning.', number: 42, file: '0042-optimizers.html' },
      { slug: 'dl-regularization',               title: 'Deep Learning Regularization',         subtitle: 'Preventing deep network overfitting — Dropout, Batch Normalisation, weight decay, and early stopping in practice.', number: 43, file: '0043-dl-regularization.html' },
      { slug: 'cnn-fundamentals',                title: 'CNN Fundamentals',                     subtitle: 'The architecture that changed computer vision — convolutions, pooling, feature maps, and why spatial locality matters for image understanding.', number: 44, file: '0044-cnn-fundamentals.html' },
      { slug: 'cnn-practice',                    title: 'CNNs in Practice',                     subtitle: 'Building and training CNNs in PyTorch — architecture choices, data augmentation, and the debugging process that turns a non-converging network into one that learns.', number: 45, file: '0045-cnn-practice.html' },
      { slug: 'transfer-learning',               title: 'Transfer Learning',                    subtitle: 'Reusing what a large model already knows — fine-tuning pre-trained ImageNet models on small datasets, and when to freeze vs. update layers.', number: 46, file: '0046-transfer-learning.html' },
      { slug: 'sequence-models-rnn-lstm-gru',    title: 'Sequence Models: RNN, LSTM & GRU',   subtitle: 'Processing sequential data with memory — how RNNs suffer from vanishing gradients, and how LSTMs and GRUs solve it with gating mechanisms.', number: 47, file: '0047-sequence-models-rnn-lstm-gru.html' },
    ],
  },
  {
    number: 4,
    name: 'Phase 4 — NLP & Large Language Models',
    urlSegment: 'phase-4',
    contentDir: 'ml-mastery',
    lessons: [
      { slug: 'nlp-fundamentals',           title: 'NLP Fundamentals',                    subtitle: 'Text as data — tokenisation, vocabulary, n-grams, and the preprocessing pipeline that turns raw language into model-ready inputs.', number: 48, file: '0048-nlp-fundamentals.html' },
      { slug: 'word-embeddings',            title: 'Word Embeddings',                     subtitle: 'Dense vector representations of meaning — Word2Vec, GloVe, and how geometric relationships in embedding space encode semantic similarity.', number: 49, file: '0049-word-embeddings.html' },
      { slug: 'seq2seq-encoder-decoder',    title: 'Seq2Seq: Encoder-Decoder',            subtitle: 'The architecture behind translation and summarisation — encoding an input sequence and decoding a target sequence with a shared latent state.', number: 50, file: '0050-seq2seq-encoder-decoder.html' },
      { slug: 'attention-mechanism',        title: 'The Attention Mechanism',             subtitle: 'Letting the model focus on what\'s relevant — the additive and multiplicative attention mechanisms that freed sequence models from fixed-length bottlenecks.', number: 51, file: '0051-attention-mechanism.html' },
      { slug: 'transformer-architecture',   title: 'Transformer Architecture',            subtitle: 'The architecture that replaced everything — self-attention, positional encoding, multi-head attention, and the encoder-decoder structure behind BERT and GPT.', number: 52, file: '0052-transformer-architecture.html' },
      { slug: 'huggingface-bert',           title: 'Fine-tuning BERT with Hugging Face', subtitle: 'Using a pre-trained bidirectional transformer — fine-tuning BERT on classification, NER, and QA tasks with the Hugging Face Transformers library.', number: 53, file: '0053-huggingface-bert.html' },
      { slug: 'huggingface-gpt2',           title: 'Text Generation with GPT-2',         subtitle: 'Autoregressive language generation — how GPT-2 predicts the next token, and how to fine-tune it for domain-specific text generation.', number: 54, file: '0054-huggingface-gpt2.html' },
      { slug: 'llm-finetuning-lora-peft',   title: 'LLM Fine-tuning: LoRA & PEFT',       subtitle: 'Efficient fine-tuning of large language models — Low-Rank Adaptation (LoRA) and the PEFT library for adapting billion-parameter models without full retraining.', number: 55, file: '0055-llm-finetuning-lora-peft.html' },
    ],
  },
  {
    number: 5,
    name: 'Phase 5 — Computer Vision & Multimodal',
    urlSegment: 'phase-5',
    contentDir: 'ml-mastery',
    lessons: [
      { slug: 'object-detection-segmentation', title: 'Object Detection & Segmentation',   subtitle: 'Locating and classifying objects within images — bounding box regression, anchor boxes, YOLO, and the difference between detection, segmentation, and instance segmentation.', number: 56, file: '0056-object-detection-segmentation.html' },
      { slug: 'gans',                           title: 'Generative Adversarial Networks',   subtitle: 'Generating realistic synthetic data — how GANs pit a generator against a discriminator, training dynamics, and applications from image synthesis to data augmentation.', number: 57, file: '0057-gans.html' },
      { slug: 'diffusion-models',               title: 'Diffusion Models',                  subtitle: 'The architecture behind Stable Diffusion and DALL-E — how models learn to reverse a noising process to generate high-quality images from noise.', number: 58, file: '0058-diffusion-models.html' },
      { slug: 'rag',                            title: 'Retrieval-Augmented Generation',    subtitle: 'Augmenting LLM generation with retrieved context — how RAG grounds responses in a document store to reduce hallucinations and enable knowledge-base Q&A.', number: 59, file: '0059-rag.html' },
      { slug: 'multimodal-models',              title: 'Multimodal Models',                 subtitle: 'Models that see and speak — how vision-language models align image and text representations, enabling captioning, visual QA, and cross-modal retrieval.', number: 60, file: '0060-multimodal-models.html' },
    ],
  },
];

// ── Flat lesson index for cross-phase navigation ───────────────────────────

type FlatLesson = LessonMeta & { urlSegment: string };

const ALL_ML_LESSONS: FlatLesson[] = ML_PHASES.flatMap((phase) =>
  phase.lessons.map((l) => ({ ...l, urlSegment: phase.urlSegment }))
);

// ── Nav link rewriting ─────────────────────────────────────────────────────

const COURSE_BASE = '/tutorials/ml-and-dl-mastery';

function buildNavLinkMap(): Record<string, string> {
  const map: Record<string, string> = {
    '0000-overview.html': COURSE_BASE,
  };
  ML_PHASES.forEach((phase) => {
    phase.lessons.forEach((lesson) => {
      map[lesson.file] = `${COURSE_BASE}/${phase.urlSegment}/${lesson.slug}`;
    });
  });
  return map;
}

const NAV_LINK_MAP = buildNavLinkMap();

function replaceNavLinks(html: string): string {
  let result = html;
  for (const [file, route] of Object.entries(NAV_LINK_MAP)) {
    result = result.split(`href="${file}"`).join(`href="${route}"`);
    result = result.split(`href="./${file}"`).join(`href="${route}"`);
    result = result.split(`href="../${file}"`).join(`href="${route}"`);
    result = result.split(`href="./lessons/${file}"`).join(`href="${route}"`);
  }
  return result;
}

// ── Quiz widget (inlined from assets/quiz.js) ──────────────────────────────

const ML_QUIZ_JS = `class MLQuiz {
  constructor(containerId, questions) {
    this.id = containerId;
    this.container = document.getElementById(containerId);
    if (!this.container) return;
    this.questions = questions;
    this.state = questions.map(() => ({ selected: null, locked: false }));
    this._render();
  }
  _render() {
    const c = this.container;
    c.className = 'quiz';
    c.innerHTML = '';
    const title = this._el('div', 'quiz-title');
    title.innerHTML = '<span>&#x1F9E0;</span> Knowledge Check — ' + this.questions.length + ' Questions';
    c.appendChild(title);
    this.questions.forEach((q, qi) => c.appendChild(this._renderQ(q, qi)));
    const footer = this._el('div', 'quiz-footer');
    footer.id = this.id + '--footer';
    const btn = this._el('button', 'quiz-submit-btn');
    btn.textContent = 'Check My Answers';
    btn.disabled = true;
    btn.addEventListener('click', () => this._submitAll());
    footer.appendChild(btn);
    c.appendChild(footer);
  }
  _renderQ(q, qi) {
    const card = this._el('div', 'quiz-question');
    card.id = this.id + '--q' + qi;
    const header = this._el('div', 'quiz-question-header');
    const num = this._el('span', 'quiz-q-number');
    num.textContent = 'Q' + (qi + 1);
    const text = this._el('span', 'quiz-q-text');
    text.textContent = q.question;
    header.appendChild(num); header.appendChild(text);
    card.appendChild(header);
    const opts = this._el('div', 'quiz-options');
    q.options.forEach((opt, oi) => {
      const optEl = this._el('div', 'quiz-option');
      optEl.id = this.id + '--q' + qi + '--o' + oi;
      optEl.dataset.qi = qi; optEl.dataset.oi = oi;
      const letter = this._el('span', 'quiz-option-letter');
      letter.textContent = String.fromCharCode(65 + oi);
      const txt = this._el('span', 'quiz-option-text');
      txt.textContent = opt;
      optEl.appendChild(letter); optEl.appendChild(txt);
      optEl.addEventListener('click', () => this._select(qi, oi));
      opts.appendChild(optEl);
    });
    card.appendChild(opts);
    const expl = this._el('div', 'quiz-explanation hidden');
    expl.id = this.id + '--q' + qi + '--expl';
    card.appendChild(expl);
    return card;
  }
  _select(qi, oi) {
    if (this.state[qi].locked) return;
    this.state[qi].selected = oi;
    this.questions[qi].options.forEach((_, i) => {
      const el = document.getElementById(this.id + '--q' + qi + '--o' + i);
      if (el) el.classList.toggle('selected', i === oi);
    });
    this._updateSubmitBtn();
  }
  _updateSubmitBtn() {
    const allAnswered = this.state.every(s => s.selected !== null);
    const btn = document.querySelector('#' + this.id + '--footer .quiz-submit-btn');
    if (btn) btn.disabled = !allAnswered;
  }
  _submitAll() {
    let correct = 0;
    this.questions.forEach((q, qi) => {
      const s = this.state[qi];
      if (s.selected === null) return;
      s.locked = true;
      const isCorrect = s.selected === q.correct;
      if (isCorrect) correct++;
      const card = document.getElementById(this.id + '--q' + qi);
      card.classList.add(isCorrect ? 'answered-correct' : 'answered-wrong');
      q.options.forEach((_, oi) => {
        const el = document.getElementById(this.id + '--q' + qi + '--o' + oi);
        if (!el) return;
        el.classList.remove('selected');
        if (oi === q.correct) el.classList.add('correct');
        else if (oi === s.selected) el.classList.add('wrong');
      });
      const expl = document.getElementById(this.id + '--q' + qi + '--expl');
      if (expl) {
        expl.className = 'quiz-explanation ' + (isCorrect ? 'correct' : 'wrong');
        expl.innerHTML = '<strong>' + (isCorrect ? '\\u2713 Correct!' : '\\u2717 Not quite. The answer is ' + String.fromCharCode(65 + q.correct) + '.') + '</strong> ' + q.explanation;
      }
    });
    const total = this.questions.length;
    const pct = Math.round((correct / total) * 100);
    const grade = pct >= 80 ? 'great' : pct >= 60 ? 'ok' : 'review';
    const msgs = { great: '\\uD83C\\uDF89 Excellent work! You\\'re ready to move on.', ok: '\\uD83D\\uDC4D Solid effort. Read the explanations above, then move on.', review: '\\uD83D\\uDCDA Review the lesson and try again when you\\'re ready.' };
    const footer = document.getElementById(this.id + '--footer');
    footer.innerHTML = '<div class="quiz-result"><span class="quiz-score">' + correct + ' / ' + total + ' correct (' + pct + '%)</span><span class="quiz-feedback">' + msgs[grade] + '</span><button class="quiz-retry-btn" onclick="location.reload()">&#x21BA; Try Again</button></div>';
  }
  _el(tag, cls) { const el = document.createElement(tag); el.className = cls; return el; }
}`;

// ── HTML parsing ───────────────────────────────────────────────────────────

function parseMLLesson(rawHtml: string): { bodyHtml: string; script: string } {
  const mainStart = rawHtml.indexOf('<main class="lesson-main">');
  const mainEnd   = rawHtml.lastIndexOf('</main>');
  let bodyHtml =
    mainStart !== -1 && mainEnd !== -1
      ? rawHtml.slice(mainStart, mainEnd + '</main>'.length)
      : rawHtml.slice(rawHtml.indexOf('<body>') + '<body>'.length, rawHtml.indexOf('</body>')).trim();

  bodyHtml = replaceNavLinks(bodyHtml);

  const inlineScripts: string[] = [];
  const scriptRegex = /<script(?![^>]*src=)[^>]*>([\s\S]*?)<\/script>/g;
  let match: RegExpExecArray | null;
  while ((match = scriptRegex.exec(rawHtml)) !== null) {
    const content = match[1].trim();
    if (content) inlineScripts.push(content);
  }

  const seen = new Set<string>();
  const uniqueScripts = inlineScripts.filter((s) => {
    if (seen.has(s)) return false;
    seen.add(s);
    return true;
  });

  const script = ML_QUIZ_JS + '\n\n' + uniqueScripts.join('\n\n');
  return { bodyHtml, script };
}

// ── Public API ─────────────────────────────────────────────────────────────

export function getMLLessonData(phaseUrlSegment: string, slug: string): MLLessonData {
  const allIndex = ALL_ML_LESSONS.findIndex(
    (l) => l.urlSegment === phaseUrlSegment && l.slug === slug
  );
  if (allIndex === -1) throw new Error(`ML lesson not found: ${phaseUrlSegment}/${slug}`);

  const meta = ALL_ML_LESSONS[allIndex];
  const phase = ML_PHASES.find((p) => p.urlSegment === phaseUrlSegment)!;

  const contentPath = path.join(process.cwd(), 'src', 'content', 'ml-mastery', meta.file);
  const rawHtml = fs.readFileSync(contentPath, 'utf-8');
  const { bodyHtml, script } = parseMLLesson(rawHtml);

  const prevMeta = allIndex > 0 ? ALL_ML_LESSONS[allIndex - 1] : null;
  const nextMeta = allIndex < ALL_ML_LESSONS.length - 1 ? ALL_ML_LESSONS[allIndex + 1] : null;

  return {
    ...meta,
    phaseNumber: phase.number,
    phaseName: phase.name,
    bodyHtml,
    script,
    prev: prevMeta
      ? { slug: prevMeta.slug, title: prevMeta.title, urlSegment: prevMeta.urlSegment }
      : null,
    next: nextMeta
      ? { slug: nextMeta.slug, title: nextMeta.title, urlSegment: nextMeta.urlSegment }
      : null,
  };
}
