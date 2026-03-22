case "cjm": {
  const current =
    answers[question.id] ?? {
      stages: CJM_STAGES.map((stage) => ({
        stage,
        description: CJM_STAGE_DESCRIPTIONS[stage],
        whatHappens: "",
        duration: "",
        clientGets: "",
        companyGets: "",
        problems: "",
      })),
    };

  return (
    <div className="space-y-4">
      {current.stages.map((step: any, i: number) => (
        <div key={step.stage} className="rounded-[24px] border border-white/8 bg-white/[0.04] p-4 md:p-5">
          <div className="mb-4 flex flex-col gap-1">
            <div className="text-xs uppercase tracking-[0.24em] text-white/35">
              Stage {i + 1}
            </div>
            <div className="text-base font-medium text-white">{step.stage}</div>
            <div className="text-sm text-white/50">{step.description}</div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <div className="mb-2 text-sm text-white/55">Что происходит</div>
              <textarea
                placeholder="Опишите, что происходит на этом этапе"
                className={textareaClass}
                rows={4}
                value={step.whatHappens}
                onChange={(e) => {
                  const nextStages = [...current.stages];
                  nextStages[i] = { ...nextStages[i], whatHappens: e.target.value };
                  setAnswer(question.id, { ...current, stages: nextStages });
                }}
              />
            </div>

            <div>
              <div className="mb-2 text-sm text-white/55">Длительность</div>
              <input
                placeholder="Например: 1 день / 2 недели"
                className={inputClass}
                value={step.duration}
                onChange={(e) => {
                  const nextStages = [...current.stages];
                  nextStages[i] = { ...nextStages[i], duration: e.target.value };
                  setAnswer(question.id, { ...current, stages: nextStages });
                }}
              />
            </div>

            <div>
              <div className="mb-2 text-sm text-white/55">Что получает клиент</div>
              <textarea
                placeholder="Ценность для клиента на этом этапе"
                className={textareaClass}
                rows={4}
                value={step.clientGets}
                onChange={(e) => {
                  const nextStages = [...current.stages];
                  nextStages[i] = { ...nextStages[i], clientGets: e.target.value };
                  setAnswer(question.id, { ...current, stages: nextStages });
                }}
              />
            </div>

            <div>
              <div className="mb-2 text-sm text-white/55">Что получает компания</div>
              <textarea
                placeholder="Какой результат получает бизнес"
                className={textareaClass}
                rows={4}
                value={step.companyGets}
                onChange={(e) => {
                  const nextStages = [...current.stages];
                  nextStages[i] = { ...nextStages[i], companyGets: e.target.value };
                  setAnswer(question.id, { ...current, stages: nextStages });
                }}
              />
            </div>
          </div>

          <div className="mt-4">
            <div className="mb-2 text-sm text-white/45">Проблемы (опционально)</div>
            <textarea
              placeholder="Где здесь возникают потери, трение или замедление"
              className={textareaClass}
              rows={3}
              value={step.problems}
              onChange={(e) => {
                const nextStages = [...current.stages];
                nextStages[i] = { ...nextStages[i], problems: e.target.value };
                setAnswer(question.id, { ...current, stages: nextStages });
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
