import fs from 'fs';
import path from 'path';
import type { LessonMeta, PhaseMeta } from '@/lib/backend-course';
import { extractHeadingsAndInjectIds, type LessonHeading } from '@/lib/lesson-toc';

export type { LessonMeta as MLLessonMeta, PhaseMeta as MLPhaseMeta };

export type MLLessonData = LessonMeta & {
  phaseNumber: number;
  phaseName: string;
  bodyHtml: string;
  script: string;
  headings: LessonHeading[];
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
      { slug: 'numpy-arrays-fundamentals', title: 'NumPy Arrays & Shapes', subtitle: 'The backbone of every ML library — how Python represents numbers at speed, and why it matters for every algorithm you\'ll ever build.', number: 1, file: '0001-numpy-arrays-fundamentals.html' },
      { slug: 'numpy-operations-broadcasting', title: 'NumPy Operations & Broadcasting', subtitle: 'How NumPy does math on millions of numbers at once — the engine behind matrix multiplication, gradient computation, and feature normalization.', number: 2, file: '0002-numpy-operations-broadcasting.html' },
      { slug: 'pandas-dataframes', title: 'Pandas DataFrames & Series', subtitle: 'The tool every ML engineer uses to load, inspect, and understand raw data — before any model is trained.', number: 3, file: '0003-pandas-dataframes.html' },
      { slug: 'pandas-data-cleaning', title: 'Pandas Data Cleaning & EDA', subtitle: 'The work that makes or breaks every ML project — handling missing values, fixing data types, removing duplicates, and extracting insights before you touch a model.', number: 4, file: '0004-pandas-data-cleaning.html' },
      { slug: 'data-visualization', title: 'Data Visualization with Matplotlib & Seaborn', subtitle: 'See your data before you model it — mastering the charts and plots that reveal patterns, outliers, and distributions invisible in raw numbers.', number: 5, file: '0005-data-visualization.html' },
      { slug: 'statistics-descriptive', title: 'Statistics: Central Tendency, Dispersion, IQR & Outlier Treatment', subtitle: 'The mathematical toolkit behind every preprocessing decision — knowing these statistics is knowing why you clean data the way you do.', number: 6, file: '0006-statistics-descriptive.html' },
      { slug: 'probability-distributions', title: 'Probability, Distributions, Z-Score & Normal Distribution', subtitle: 'The mathematical foundation of uncertainty — understanding how data is generated and how to use probability to make decisions and detect anomalies.', number: 7, file: '0007-probability-distributions.html' },
      { slug: 'linear-algebra', title: 'Linear Algebra for ML: Vectors, Matrices & Dot Products', subtitle: 'Every ML algorithm is linear algebra in disguise — mastering matrices and dot products means understanding what models actually compute.', number: 8, file: '0008-linear-algebra.html' },
    ],
  },
  {
    number: 2,
    name: 'Phase 2 — Supervised Machine Learning',
    urlSegment: 'phase-2',
    contentDir: 'ml-mastery',
    lessons: [
      { slug: 'ml-project-lifecycle', title: 'ML Project Life Cycle: From SOW to Deployment', subtitle: 'The end-to-end map every ML engineer carries in their head — from defining the business problem through shipping a model and keeping it healthy in production.', number: 9, file: '0009-ml-project-lifecycle.html' },
      { slug: 'data-preprocessing', title: 'Data Preprocessing: Encoding, Scaling & sklearn Pipelines', subtitle: 'Transform raw data into model-ready inputs — without leaking information from the test set into training. The foundation of every reliable ML workflow.', number: 10, file: '0010-data-preprocessing.html' },
      { slug: 'linear-regression', title: 'Linear Regression: Cost Functions (MSE, MAE) & OLS', subtitle: 'The simplest supervised learning algorithm — and the foundation for understanding every model that follows. Master it mathematically, implement it from scratch, and use it with scikit-learn.', number: 11, file: '0011-linear-regression.html' },
      { slug: 'gradient-descent', title: 'Gradient Descent & Calculus for ML', subtitle: 'The single algorithm that powers almost every modern ML model — from logistic regression to GPT. Master the intuition, the math, and the code behind "walking downhill".', number: 12, file: '0012-gradient-descent.html' },
      { slug: 'polynomial-regression', title: 'Polynomial & Multivariate Regression', subtitle: 'Extend linear regression to multiple features and non-linear relationships — and see exactly how adding complexity helps (and how it can hurt).', number: 13, file: '0013-polynomial-regression.html' },
      { slug: 'bias-variance-tradeoff', title: 'Bias–Variance Tradeoff, Underfitting & Overfitting', subtitle: 'The single most important conceptual framework in ML — understanding why models fail, how to diagnose the failure mode, and what to do about it.', number: 14, file: '0014-bias-variance-tradeoff.html' },
      { slug: 'logistic-regression', title: 'Logistic Regression: Binary & Multi-class Classification', subtitle: 'Despite its name, logistic regression is a classification algorithm — and one of the most important in all of ML. Master the sigmoid, log loss, and the bridge from probability scores to predictions.', number: 15, file: '0015-logistic-regression.html' },
      { slug: 'knn', title: 'K-Nearest Neighbors (KNN)', subtitle: 'The simplest non-parametric algorithm — classify by asking who your neighbors are. Master distance metrics, the K tradeoff, and why scaling is non-negotiable.', number: 16, file: '0016-knn.html' },
      { slug: 'naive-bayes', title: 'Naive Bayes Classifier', subtitle: 'Bayes\' theorem + one strong assumption = a surprisingly powerful classifier. Fast, effective on text, and mathematically elegant — despite a simplification that\'s almost always wrong.', number: 17, file: '0017-naive-bayes.html' },
      { slug: 'svm', title: 'Support Vector Machines (SVMs)', subtitle: 'Find the widest possible gap between classes. SVMs combine elegant geometry, a powerful kernel trick, and strong theoretical foundations — and were the dominant ML algorithm before deep learning.', number: 18, file: '0018-svm.html' },
      { slug: 'model-evaluation-1', title: 'Model Evaluation I: Confusion Matrix, Precision, Recall & F1', subtitle: 'Accuracy is almost always the wrong metric. Learn to see how your model fails — and choose the metric that aligns with the real cost of each type of mistake.', number: 19, file: '0019-model-evaluation-1.html' },
      { slug: 'model-evaluation-2', title: 'Model Evaluation II: ROC/AUC, Cost-Benefit Analysis & Stratified K-Fold', subtitle: 'Move beyond hard label metrics. Evaluate model quality across all possible thresholds, translate model performance into business value, and validate reliably with stratified cross-validation.', number: 20, file: '0020-model-evaluation-2.html' },
      { slug: 'regularization', title: 'Regularization: L1 (Lasso), L2 (Ridge) & ElasticNet', subtitle: 'Tame overfitting by penalising large coefficients — how L1 selects features, L2 shrinks them all, and ElasticNet blends both for the best of both worlds.', number: 21, file: '0021-regularization.html' },
      { slug: 'decision-trees', title: 'Decision Trees', subtitle: 'The one algorithm a human can actually read — how trees split data, measure impurity, and why they overfit without constraints.', number: 22, file: '0022-decision-trees.html' },
      { slug: 'ensemble-methods', title: 'Ensemble Methods: Majority Voting, Bagging & Random Forests', subtitle: 'Why combining many imperfect models beats any single perfect one — the wisdom of crowds applied to machine learning.', number: 23, file: '0023-ensemble-methods.html' },
      { slug: 'boosting', title: 'Boosting: AdaBoost, Gradient Boosting, XGBoost & LightGBM', subtitle: 'Sequential ensembles that learn from their own mistakes — from adaptive weighting to gradient descent in function space to production-grade implementations.', number: 24, file: '0024-boosting.html' },
      { slug: 'feature-engineering', title: 'Feature Engineering: Cleaning, Creation & Selection', subtitle: 'The part of ML where domain knowledge meets creativity — transforming raw data into signals that models can actually learn from.', number: 25, file: '0025-feature-engineering.html' },
      { slug: 'imbalanced-datasets', title: 'Handling Imbalanced Datasets: SMOTE, Class Weights & Resampling', subtitle: 'Why 99% accuracy can be completely useless, and how to build models that actually detect the rare class you care about.', number: 26, file: '0026-imbalanced-datasets.html' },
      { slug: 'hyperparameter-tuning', title: 'Hyperparameter Tuning: GridSearchCV, RandomizedSearchCV & Model Selection Guide', subtitle: 'Systematic search for the best model configuration — when to grid search, when to randomise, and how to choose the right algorithm for your problem.', number: 27, file: '0027-hyperparameter-tuning.html' },
    ],
  },
  {
    number: 3,
    name: 'Phase 3 — Unsupervised Learning & Time Series',
    urlSegment: 'phase-3',
    contentDir: 'ml-mastery',
    lessons: [
      { slug: 'kmeans-clustering', title: 'K-Means Clustering', subtitle: 'No labels needed — how to discover natural groupings in data, measure cluster quality, and choose the right number of clusters using the elbow method and silhouette analysis.', number: 28, file: '0028-kmeans-clustering.html' },
      { slug: 'hierarchical-dbscan-clustering', title: 'Hierarchical & DBSCAN Clustering', subtitle: 'Beyond K-Means — how tree-based hierarchical clustering reveals nested structure, and how DBSCAN finds clusters of any shape while automatically labelling outliers as noise.', number: 29, file: '0029-hierarchical-dbscan-clustering.html' },
      { slug: 'pca', title: 'Principal Component Analysis (PCA)', subtitle: 'How to compress 100 correlated features into 10 uncorrelated ones without losing the information that matters — the most important dimensionality reduction tool in the ML toolkit.', number: 30, file: '0030-pca.html' },
      { slug: 'tsne-umap', title: 't-SNE & UMAP: Visualizing High-Dimensional Data', subtitle: 'When PCA\'s linear lens isn\'t enough — the two dominant non-linear dimensionality reduction tools that reveal cluster structure invisible to any linear method, and the critical pitfalls of misreading their outputs.', number: 31, file: '0031-tsne-umap.html' },
      { slug: 'anomaly-detection', title: 'Anomaly Detection', subtitle: 'Finding the needle in the haystack — statistical methods, Isolation Forest, LOF, and One-Class SVM for detecting fraud, faults, and intrusions without labelled data.', number: 32, file: '0032-anomaly-detection.html' },
      { slug: 'recommendation-systems', title: 'Recommendation Systems & Collaborative Filtering', subtitle: 'How Netflix knows what you want to watch, Amazon knows what you want to buy, and Spotify knows what song comes next — from cosine similarity to matrix factorization.', number: 33, file: '0033-recommendation-systems.html' },
      { slug: 'time-series-analysis', title: 'Time Series Analysis: Trends, Seasonality & Decomposition', subtitle: 'How to read the story hidden in sequential data — decomposing time series into trend, season, and noise components before any forecasting begins.', number: 34, file: '0034-time-series-analysis.html' },
      { slug: 'time-series-forecasting', title: 'Time Series Forecasting: ARIMA, Prophet & LSTM', subtitle: 'From classical ARIMA models to Facebook\'s Prophet and neural sequence models — building forecasters that generate actionable predictions with confidence intervals.', number: 35, file: '0035-time-series-forecasting.html' },
    ],
  },
  {
    number: 4,
    name: 'Phase 4 — Deep Learning Foundations',
    urlSegment: 'phase-4',
    contentDir: 'ml-mastery',
    lessons: [
      { slug: 'dl-vs-ml', title: 'DL vs ML: When to Use What — Architectures & Tooling', subtitle: 'Before writing a single line of deep learning code, understand when deep learning is the right tool — and when classical ML is still better. Every professional ML engineer knows this boundary intimately.', number: 36, file: '0036-dl-vs-ml.html' },
      { slug: 'neural-network-intuition', title: 'Neural Network Intuition: Neurons, Perceptrons & Activation Functions', subtitle: 'Understanding one artificial neuron unlocks everything else. We build from a single weighted sum all the way to the universal approximation theorem — with NumPy code at every step.', number: 37, file: '0037-neural-network-intuition.html' },
      { slug: 'pytorch-tensors-autograd', title: 'PyTorch Tensors & Autograd: The Engine of Deep Learning', subtitle: 'Master PyTorch tensors — the GPU-capable, gradient-tracking cousin of NumPy arrays — and understand the autograd system that makes automatic differentiation possible. Everything in PyTorch deep learning is built on these foundations.', number: 38, file: '0038-pytorch-tensors-autograd.html' },
      { slug: 'backpropagation', title: 'Backpropagation: The Chain Rule in Action', subtitle: 'The algorithm that made modern deep learning possible. We derive it from first principles, implement it manually in NumPy for a 2-layer network, then verify every gradient against PyTorch\'s automatic differentiation — and finally use it to solve XOR.', number: 39, file: '0039-backpropagation.html' },
      { slug: 'gradient-descent-variants', title: 'Gradient Descent Variants: Batch GD, Mini-Batch & SGD', subtitle: 'How much of the training data should you look at before taking each optimization step? The answer determines whether your model trains in minutes or hours — and whether it generalises well or gets stuck.', number: 40, file: '0040-gradient-descent-variants.html' },
      { slug: 'pytorch-datasets-dataloaders', title: 'PyTorch in Practice: Datasets, DataLoaders & the Training Loop', subtitle: 'The complete infrastructure of PyTorch model training — from loading one sample to orchestrating GPU-accelerated mini-batch training with the canonical training loop.', number: 41, file: '0041-pytorch-datasets-dataloaders.html' },
      { slug: 'optimizers', title: 'Optimizers: EWMA, Momentum, RMSProp & Adam', subtitle: 'Why plain gradient descent stalls on real neural networks — and how modern optimizers solve this with momentum, adaptive learning rates, and their clever combination in Adam.', number: 42, file: '0042-optimizers.html' },
      { slug: 'dl-regularization', title: 'Regularization in DL: Dropout, Batch Normalization & Early Stopping', subtitle: 'Deep networks can memorise entire training datasets. These three techniques are the guardrails that force a model to learn genuine patterns rather than memorising — each attacking overfitting from a completely different angle.', number: 43, file: '0043-dl-regularization.html' },
      { slug: 'cnn-fundamentals', title: 'Convolutional Neural Networks: Convolution, Kernels, Pooling, Padding & Strides', subtitle: 'MLPs are blind to spatial structure — a CNN is engineered to see it. Learn how local connections, weight sharing, and hierarchical feature learning turn pixels into understanding.', number: 44, file: '0044-cnn-fundamentals.html' },
      { slug: 'cnn-practice', title: 'CNNs in Practice: CIFAR-10 Classification & Data Augmentation', subtitle: 'Theory meets reality — build a CNN from scratch on CIFAR-10, learn why data augmentation is one of the most powerful tricks in vision, and understand how BatchNorm stabilises training.', number: 45, file: '0045-cnn-practice.html' },
      { slug: 'transfer-learning', title: 'Transfer Learning: ResNet, EfficientNet & MobileNet', subtitle: 'The single most practical skill in computer vision — take a model pre-trained on millions of images and adapt it to your task in hours with a fraction of the data.', number: 46, file: '0046-transfer-learning.html' },
      { slug: 'sequence-models-rnn-lstm-gru', title: 'Sequence Models: RNN Types, Vanishing Gradient, LSTM & GRU', subtitle: 'Neural networks with memory — understand how RNNs, LSTMs, and GRUs process sequential data, why vanilla RNNs fail on long sequences, and how gated architectures solve the problem.', number: 47, file: '0047-sequence-models-rnn-lstm-gru.html' },
    ],
  },
  {
    number: 5,
    name: 'Phase 5 — Advanced Deep Learning & NLP',
    urlSegment: 'phase-5',
    contentDir: 'ml-mastery',
    lessons: [
      { slug: 'nlp-fundamentals', title: 'NLP Fundamentals: Text Preprocessing, Tokenization & TF-IDF', subtitle: 'Before any neural network can read text, that text must become numbers. Learn the full preprocessing pipeline — from raw strings to cleaned tokens to TF-IDF vectors — and understand exactly why every step exists.', number: 48, file: '0048-nlp-fundamentals.html' },
      { slug: 'word-embeddings', title: 'Word Embeddings: Word2Vec, GloVe & Contextual Embeddings', subtitle: 'Dense vector representations that encode semantic relationships — learn how Word2Vec learns that king−man+woman≈queen, how GloVe uses global statistics, and why static embeddings ultimately need to become contextual.', number: 49, file: '0049-word-embeddings.html' },
      { slug: 'seq2seq-encoder-decoder', title: 'Sequence-to-Sequence: Encoder-Decoder Architecture', subtitle: 'How neural networks translate, summarise, and generate text — understand the encoder-decoder framework, teacher forcing, beam search, and why the information bottleneck problem directly motivated the Attention mechanism.', number: 50, file: '0050-seq2seq-encoder-decoder.html' },
      { slug: 'attention-mechanism', title: 'Attention Mechanism: Queries, Keys & Values', subtitle: 'The single insight that transformed NLP — learn how attention lets networks focus on what matters, the elegant Query-Key-Value formulation, self-attention, multi-head attention, and why this leads directly to the Transformer.', number: 51, file: '0051-attention-mechanism.html' },
      { slug: 'transformer-architecture', title: 'The Transformer Architecture: Positional Embeddings & Multi-Head Attention', subtitle: 'The architecture behind ChatGPT, Claude, Gemini, GitHub Copilot, and AlphaFold — every component explained from first principles, with the "why" behind every design decision.', number: 52, file: '0052-transformer-architecture.html' },
      { slug: 'huggingface-bert', title: 'Hugging Face & BERT: Transformers in Practice + Spam Classification', subtitle: 'Load a state-of-the-art language model in one line, understand exactly what happens inside the tokenizer, and fine-tune BERT to build a spam classifier that beats anything you could train from scratch.', number: 53, file: '0053-huggingface-bert.html' },
      { slug: 'huggingface-gpt2', title: 'Hugging Face & GPT-2: Generative Language Models & Next-Word Prediction', subtitle: 'From next-word prediction to writing essays, code, and stories — understand how GPT-2 generates text, what temperature and sampling strategies control, and how to fine-tune for custom generation tasks.', number: 54, file: '0054-huggingface-gpt2.html' },
      { slug: 'llm-finetuning-lora-peft', title: 'Fine-Tuning LLMs with LoRA & PEFT', subtitle: 'Fine-tune a 7-billion-parameter model on a single consumer GPU — how LoRA achieves full fine-tuning quality by training just 0.06% of parameters, and how QLoRA puts this within reach of anyone with an RTX 3080.', number: 55, file: '0055-llm-finetuning-lora-peft.html' },
      { slug: 'object-detection-segmentation', title: 'Object Detection & Semantic Segmentation', subtitle: 'From "is there a cat?" to "exactly which pixels are the cat" — the complete hierarchy of computer vision tasks powering self-driving cars, medical imaging, and augmented reality.', number: 56, file: '0056-object-detection-segmentation.html' },
      { slug: 'gans', title: 'Generative Adversarial Networks (GANs)', subtitle: 'Two neural networks in competitive training — one forger, one detective — whose adversarial competition produces strikingly realistic synthetic images, data augmentation, and creative AI outputs.', number: 57, file: '0057-gans.html' },
      { slug: 'diffusion-models', title: 'Diffusion Models: How DALL·E & Stable Diffusion Work', subtitle: 'From pure noise to photorealistic images — the mathematics and engineering behind the most powerful generative AI systems of our era.', number: 58, file: '0058-diffusion-models.html' },
      { slug: 'rag', title: 'Retrieval-Augmented Generation (RAG)', subtitle: 'Give your LLM a memory and a library — solving hallucination, knowledge cutoffs, and private data access with a combination of vector search and language generation.', number: 59, file: '0059-rag.html' },
      { slug: 'multimodal-models', title: 'Multimodal Models: Vision-Language & Audio', subtitle: 'AI systems that see, hear, and read simultaneously — the frontier of foundation models, from CLIP and LLaVA to Whisper and the unified models reshaping how AI interacts with the real world.', number: 60, file: '0060-multimodal-models.html' },
    ],
  },
  {
    number: 6,
    name: 'Phase 6 — Production ML & MLOps',
    urlSegment: 'phase-6',
    contentDir: 'ml-mastery',
    lessons: [
      { slug: 'optuna-bayesian-search', title: 'Advanced Hyperparameter Tuning: Optuna & Bayesian Search', subtitle: 'Stop searching blindly — use the results of every trial to decide what to try next. Bayesian optimisation, Optuna\'s TPE sampler and pruners, multi-objective tuning, and production-grade integration with scikit-learn and PyTorch.', number: 61, file: '0061-optuna-bayesian-search.html' },
      { slug: 'shap-lime', title: 'Model Interpretability: SHAP & LIME', subtitle: 'Prying open the black box — game-theoretic and surrogate-model techniques for explaining exactly why your model made a specific prediction, to regulators, stakeholders, and yourself.', number: 62, file: '0062-shap-lime.html' },
      { slug: 'mlflow', title: 'MLflow: Experiment Tracking, Model Registry & Centralized Server', subtitle: 'Stop tracking hyperparameters in spreadsheets and model files in folders named "final_v3_REAL" — MLflow gives every experiment, model, and deployment decision a permanent, queryable, team-visible record.', number: 63, file: '0063-mlflow.html' },
      { slug: 'fastapi-docker-deployment', title: 'Deploying ML Models: FastAPI, Docker & REST APIs', subtitle: 'Turn a trained model sitting in a pickle file or the MLflow Model Registry into a versioned, validated, containerised REST API that other services can actually call in production.', number: 64, file: '0064-fastapi-docker-deployment.html' },
      { slug: 'aws-sagemaker', title: 'Cloud ML: AWS SageMaker & Managed Deployment', subtitle: 'When self-managed Docker deployments stop scaling — how a managed ML platform takes over training infrastructure, model versioning, endpoint scaling, and monitoring, and what that convenience costs.', number: 65, file: '0065-aws-sagemaker.html' },
      { slug: 'data-drift-psi-csi', title: 'Monitoring in Production: Data Drift with PSI & CSI', subtitle: 'Your model\'s accuracy was great at training time — but the world keeps moving. Learn to detect silent distribution shift before it silently wrecks your predictions, using the same two statistics that risk teams have trusted for decades.', number: 66, file: '0066-data-drift-psi-csi.html' },
      { slug: 'ab-testing', title: 'A/B Testing for ML Systems', subtitle: 'Your monitoring caught the drift, your new model is deployed and ready — but "better offline" is a hypothesis, not a fact. A/B testing is how you prove it, safely, with statistics instead of vibes.', number: 67, file: '0067-ab-testing.html' },
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
  const { bodyHtml: parsedBodyHtml, script } = parseMLLesson(rawHtml);
  const { bodyHtml, headings } = extractHeadingsAndInjectIds(parsedBodyHtml);

  const prevMeta = allIndex > 0 ? ALL_ML_LESSONS[allIndex - 1] : null;
  const nextMeta = allIndex < ALL_ML_LESSONS.length - 1 ? ALL_ML_LESSONS[allIndex + 1] : null;

  return {
    ...meta,
    phaseNumber: phase.number,
    phaseName: phase.name,
    bodyHtml,
    script,
    headings,
    prev: prevMeta
      ? { slug: prevMeta.slug, title: prevMeta.title, urlSegment: prevMeta.urlSegment }
      : null,
    next: nextMeta
      ? { slug: nextMeta.slug, title: nextMeta.title, urlSegment: nextMeta.urlSegment }
      : null,
  };
}
