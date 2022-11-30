interface Step {
  program: string
  container: string
  command: string
}

export interface Rule {
  watchDir: string
  outputDir: string
  steps: Step[]
}

export interface Config {
  rules: Rule[]
}
