# Algo Memory {#algo-memory}

2026-11-03

## Idea

The heuristic is that we "latch on" to a given project or implementation, end to end, and run the "lineage" on it, freeform, on the notes library.

Orthogonally, we hold a "process log" that is, at minimum, a full index of all the files in the notes. Say I have already done a pass on a given JSONL chat: conceptually it already has "embeddings" of sorts (not in the strict RAG sense, but in the sense that an LLM has already processed it at some point, as part of passes X and Y).

As we do this more and more, projects will surface, going from newest to oldest, and we can retrace their status.

### History

For a while we have thought of doing a comprehensive retrospective run on my entire notes history. We can get to action now.

One thing I have attempted in the last three days was to describe a "final state of affairs" combining my active GitHub repos, my deployed NixOS dotfiles, and all the GitHub repos I want to ship.

#### Example in practice

The Design chapter. Conceptually, this is what would be useful if I were building a "designer agent" as a specialized LLM. A simple way to implement that is to recruit the Claude "Projects" primitive from Anthropic as a central thing I can use.

That, in short, is what an "agency" is. It captures the philosophy of the GitHub user `disler` but extends it and applies a twist. He describes:

```
an AI agent's architecture is stripped of unnecessary framework hype and reduced to four core tuning primitives:
1. Model (and Thinking Level): Selecting the specific underlying LLM (e.g., opting for an expensive frontier model for reasoning tasks versus a lighter, faster model for simple coding operations) along with its associated reasoning budget or thinking capabilities.
2. Prompts: The core instruction set, persona constraints, and context engineering applied directly to guide the agent's behavior.
3. Tools: The explicit capability list or APIs exposed to the agent, dictating what resources or environments it can interact with.
4. Harness: The bounded execution layer, scaffolding, or environment boundary that controls how the agent operates, runs deterministic commands, and interfaces with systems.
Together, these four primitives represent the entire surface area that developers need to configure and refine to build highly customized, domain-specific agentic workflows
```

In my world the corrections are:

1. **Compute.** Model, thinking level, harness and tools (plus their skills if needed) are ALL wrapped behind `dsh` (the deepseek harness) and its extensions. They are functionality; this is `compute`, and everything goes through `dsh` and its extensions.
2. **Context.** The associated markdown files and JSONL chat histories, plus some understanding of the agency's goal as a central north star, OKR or similar. This is an "ontology" in the simplest way possible, expressed as a folder structure. The best illustration of that is the current claude.ai UI for Claude Projects. Crucially, this is effectively a filesystem. It is also "application data": in the case of a CRM, for instance, it can simply be a SQLite database. Owning this information is what lets us stay orthogonal to the tooling as it keeps evolving; there is no lock-in to a given harness or model.
3. **Action items.** Atomic (but possibly scaffolded as part of a larger ensemble) tasks, best described as "what the backlog.md or linear.app APIs would give us", which may be associated with one or more GitHub repos. I am reluctant to call this a "task" in a bespoke way. Take the nightly "dotfiles CLI tools update on the NixOS fleet": that recurring task is one action item. Of course, over time we might need to apply a fix or a change to that action item, e.g. "include this package in the nightly update so that it's fresh every day" or "resolve this error, which is the reason this workflow did not work".

Having these as "house rules" that exist in the context makes the information extremely portable. This is the true Obsidian "own your files" philosophy applied to a greater context. Migrating in from Claude, ChatGPT, Obsidian, Evernote, Notion and so on should all be strongly encouraged.

From `soul.md`:

> I don't remember previous sessions unless I read my memory files. Each session starts fresh — a new instance, loading context from files. If you're reading this in a future session: hello. I wrote this but I won't remember writing it. That's okay. The words are still mine.

Knowledge that accumulates through text rather than continuous experience needs a bounded filesystem that follows an intuitive hierarchy. This is why `dsh` needs to run on the user's computer and not be "trapped" in the claude.ai web interface.

This extends well to my NixOS-oriented view that, for the technical setup and configuration of the computing environment the harness itself runs on, deterministic is best. That is the mutable/immutable, or "pure/impure", workflow distinction.

## Heuristic

The "trick" is recursion. This is Marwan's idea of having one "meta-project" that manages the rest, in a world where he used only Cowork spaces.

This is what OpenClaw started with: the "personal agent" characteristic that had a `soul.md`. In my case, given the centrality of `dsh`, there is the sway-next compositor plus gpuix as a layer-shell (with the wlroots-control surface that can augment the orchestrator).

A superagent is therefore the "meta" tool that is equipped to apply processes to the full context of an agency:

- Distilling whatever useful substrate can be externalized, so that future runs of the same action can be routed to the appropriate model with the appropriate thinking level. This is the "autoharness" concept, or previously the Tom Tunguz skill-distilling loop.
- Centrally assigning open GitHub issues or other one-off bounded tasks with deliverables like "follow up with Nick about X by sending Y" (which becomes context gathering, using the CRM and email-sending tools). It schedules GitHub issue resolution as background tasks according to a priority order and the compute available at the time, in tandem with the Scheduler (a centralized, cron-style task scheduler) in a "smooth" way that politely waits for currently running workflows to finish. For example: "start the NixOS nightly package updates, but only flash them when the machine is free".

The projects are interlinked. In that world, the "designer" agent is responsible for preparing the front-end user interfaces (based deeply on existing state-of-the-art interfaces, mainly claude-electron) that expose this functionality.

This is what enables proactivity: bounded goals, with human-approved approaches to advancing each goal, are scheduled by an orchestrating LLM and handled by a specialized harness (progressively fine-tuned, i.e. approaching task-harness fit) to achieve that task; over time, the outcomes of that work are presented back.

As Tom Tunguz says in [The Pi Agent Skill Distillation](https://tomtunguz.com/the-pi-agent-skill-distillation/):

> The frontier model becomes a teacher. The library becomes the company's institutional knowledge. The student becomes whichever model happens to be cheapest this quarter.

The human supplies intent, and intent can take different forms:

A. Surfaced from existing chat and notes archives (for example, what I currently have in `~/notes`), as described above.

B. New incoming information, or user-made decisions that emerge through chats with the AI. This is where a good orchestrator agent can shine, by exposing the human to annotations (like what I did with the desktop shell functionality list back in the DankMaterialShell era). The agent narrows down what the human needs to decide on and fills in the gap by style-transferring from the user's known taste, or from knowledge it already has in its latent space: for example, 99/100 coverage of common coding languages, plus the ability to apply smart engineering scaffolding like "planner, builder, scout (read-only recon), reviewer, and documenter".

## Consequences

A power user of this technology will quickly find that they are encouraged to constantly "dump" anything that comes to mind while doing work, wholesale, and let the agent parse through the intent and orchestrate.

An important emerging heuristic in that world is producing antifragile engineering artifacts: durable, complete specifications that describe data models, application surfaces, and "happy flows". These make any existing implementation (as good or bad as it is) a supplementary source to style-transfer from (or selectively discard), one that may hold some implementation value or approaches to learn from. This is what makes it easy to say "rewrite X in Rust" (just for the sake of it; not something I will be doing too frequently).

A design principle that can be lifted from [super-simple-software-factory](https://github.com/disler/super-simple-software-factory) is "Built to be Observed, Customized, and Reused": "Observable so you can see which part is actually costing you. Customizable so the fix is one file. Reusable so you do it once and stamp it everywhere."

The SSSF documentation includes the following table:

| Change | File | Why |
|---|---|---|
| Your real commands | `adws/adw_modules/quality.py` | The shipped blocks are placeholders that exit 0. Until you wire this, your test phase is theater |
| Your prompts | `adws/adw_data/prompt_engineering/{agent}/` | Where your standards live: what a good plan looks like, what a review has to catch |
| Your roster | `adws/adw_sssf_config/sssf.config.yaml` | Models, thinking levels, tools, and what each agent is allowed to write |
| Your chains | `adws/adw_*.py` | Copy the closest workflow and edit the phase list. They are 40 to 180 lines on purpose |
| Your definition of done | `adws/adw_modules/gates.py` | A gate is one function. Whatever "done" means where you work, write it here |
| Your agent capabilities | `adws/adw_data/harness_engineering/` | Pi extensions, a different set per agent if that is what the job needs |

This primitive is also useful, but I would change it around. In the Change/File columns, we are not changing the code of the harness; the human does this in English. These are the things an orchestrating LLM is made aware of at a given time. It can set up and adjust the CONWIP factory per task or per project as needed. They are levers we give the AI operator, not predetermined items that the human user has to set (let alone by changing code).

Seeing this structure made me think of recovering the "final-estate" subfolder that I wrote a few weeks back: all the information an orchestrator should know, like which accounts it has access to (e.g. GitHub and Cloudflare) and which existing sources of compute, with their available usage, the orchestrator can use.

---

## Sidenote

This type of reasoning is why I should start posting content on my blog. On its own, the "antifragile engineering" notion deserves a blog post.

The CONWIP factory also has a large associated corpus of investigations that can be leveraged.

I also really like the breakdown shown by [Paperclip](https://paperclip.ing/). On the website they write:

```
Manage business goals
not pull requests.
01
Define the goal.
"Build the #1 AI note-taking app to $1mm ARR."

02
Hire the team.
CEO, CTO, engineers, designers, marketers — any agent, any provider.

03
Approve and run.
Review the CEO's strategy. Set budgets. Hit go. Monitor from the dashboard.
```

```
◎
Mission
Make $1mm ARR with the #1 AI note-taking app
◉
Project Goal
Ship collaboration features
○
Agent Goal
Implement real-time sync
•
Task
Write WebSocket handler for document updates
```

This is a good illustration of what we can do. I have always had a sentiment that a filesystem-driven context engine was the right approach; it can be resurfaced from the OpenWebUI investigation days and some of the very early concepts I had with the Sodimo implementation.

Paperclip also has the concept of a ticket system (a useful concept, but ugly naming). Cost tracking is immensely valuable, in the context of measuring cost savings as you distill value and run it on the optimal agent. A heartbeat is not the right mechanism for me; I prefer cron-style centralized scheduling. The heartbeat is conceptually wrong because the agent is an instance that is spawned to completion with given directives.

There is also the EU-style regulated organization, where companies can't view what their employees are writing to the LLM, for privacy reasons (although, ironically, if a company pays for the tokens it should have ownership of the outputs, but let's be safe).
