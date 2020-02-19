---
layout: post
current: post
navigation: True
title: Intermediate Git
date: 2020-02-16 12:00:00
tags: [webclub]
class: post-template
cover: assets/images/intermediate_git/cover.png
author: abhishekkumar2718
---

**The version control system**. It's hard to imagine working on large projects or collaborating without git. If you want to learn beyond basic git and simplify your workflow, read on!

## Basic git
\\
Before we continue, You must already know:
- Basic operations - Cloning, committing and tracking file changes.
- Using branches.
- Interacting with remote.

Ben Lynn's Git Magic is a great, brief resource at 60 pages which covers above topics and everyday git. [Download here](http://www-cs-students.stanford.edu/~blynn/gitmagic/book.html).

It's also available as a git repository if you are feeling brave enough. Get started with `git clone git://repo.or.cz/gitmagic.git`.

### Craft your commits carefully
\\
Commits are more than just a series of diffs - They explain the context, the _what_ and the _why_ of changes.

Here's a commit from a patch I had recently reviewed: 
```
STRBUF_INIT_CONST: a new way to initialize strbuf

In a previous commit, a new function `STRBUF_INIT_CONST(const_str)`,
which would allow for the quick initialization of constant `strbuf`s,
was introduced.

In this commit, I check through the strbuf_* functions to edit the ones
that would try to edit the passed `strbuf` so that they are guaranteed to
behave in a predictable way when met with a constant.

Added Functions:
  `strbuf_make_var`

Updated Functions:
  `strbuf_grow`
  `strbuf_setlen`
  `strbuf_trim`
  `strbuf_trim_trailing_dir_sep`
  `strbuf_trim_trailing_newline`
  `strbuf_tolower`
  `strbuf_splice`

Functions where comments were added to clarify the expected behavior:
   `strbuf_getcwd`
```

- Title is vague. How is the _new way_ better or different than existing implementations?
- First paragraph talks about changes introduced in a previous commit, which is now duplicated across both commits.
- Second paragraph mentions _guaranteed to behave_ - How exactly is that implemented?
- A changelog is entirely redundant - Reviewer can see the changes in the diff.

Here's a much better version for the same commit:
```
strbuf: teach strbuf to initialize constant string

- Adds `STRBUF_INIT_CONST()` to initialize const strbuf by setting
allocation size to 0.

- Guarantees predictable behavior when passed a constant strbuf by
converting to non-const strbuf.

Closes gitgitgagdet issue #461
```

It's shorter, and has more information! It's easy to think how the changes are implemented. Reviewing code becomes easier and fun.

> Read up on [how to write good commit messages](https://chris.beams.io/posts/git-commit/).

### Decide on a git workflow
\\
_This section is fairly opinionated - Each workflow has advantages. Choose what suits you._

There are many workflows to use git - Feature branching, gitflow, forking workflow, centralized workflow. Learn about them and decide an appropriate workflow for the project you are working.

I am a messy developer who likes clean git logs - See a contradiction? I tend to create a lot of non-sensical, poor commits while developing. It makes sense for me to use [squash rebase workflow](https://blog.carbonfive.com/2017/08/28/always-squash-and-rebase-your-git-commits/).

My workflow looks like this:
- While there are more changes
  - Make a small change.
  - Create a commit.
- Rebase commits into large, related commits.
- Reword proper commit messages.

Anecdotally, I get more work done when I plan out commits into small chunks of ~50 lines. Or maybe organized, thought out code is faster to implement. You can't go wrong either way.

> Read up on other [git workflows](https://www.atlassian.com/git/tutorials/comparing-workflows) as well.

### Use `--patch` flag for smarter commits
\\
_You_: Listen, I know you are too enthusiatic about commits. I didn't, and now it's all grouped together - Is there something I could do?

_Me_: Ugh, use `git add -p`.

_-p_ or the _patches_ flag allows you to go over each hunk of change and decide whether to add it to the current commit. You can then create mutliple commits with relevent changes in each step.

If you have ever tried modified a file in multiple places, and wanted to commit only a section of it - now you know how.

> Once you get used to patch wise commits, look up `--interactive` flag - it's a more efficient albeit less intuitive tool solving the same problem.

### Setup SSH keys
\\
_Remembering passwords is hard._ People have terrible memories. Computers, on the other hand are unnatural at memorising. Easy and repeated passwords are a security risk. Could everyone just not?

SSH keys simplify the workflow in a easy, no effort way. Git remembers for you. Steps involved depend on your _forge_ (yes, service providers like Github are called forges):

- [Setting up SSH keys for Github](https://help.github.com/en/github/authenticating-to-github/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent).
- [Setting up SSH keys for Gitlab](https://docs.gitlab.com/ee/ssh/).

> It's one of the first things I do when I set up a system. Also, setup reasonable defaults and aliases in `~/.gitconfig`.

### Use .gitignore
\\
`.gitignore` instructs git to ignore particular files. Usually configuration and log files are ignored. But _all generatable files_ must be ignored - this includes generated binaries, object files, jars, flex/yacc generated code. Special operating system files like `.DS_Store`, `thumbs.db` should be added to global git ignore rules. The repositories look much cleaner without them.

> [gitignore.io](https://www.gitignore.io/) has extensive gitignore templates for programming languages, IDEs and projects.

### Use hooks to automate boring stuff
\\
Waiting for half hour, only for CI-CD tests to fail and complain about whitespace changes is surely an infuriating experience.

_Hooks_ to the rescue!

_Hooks_ are custom scripts which are triggered by operations like commiting, pushing. Using hooks, you can run the linter locally before each push. No more broken lint tests!.

But that is not all - You can improve your productivity by automating repetitive tasks. Clearing out build files when changing branches, deploying websites by pushing to master, creating merge requests when creating a new remote branch are good examples. 

> [githooks](https://githooks.com/) contains a lot more documentation, examples and projects for managing git hooks.

### Use submodules
\\
Submodules are way to nest repositories. How is that useful, you might ask? Here's an example from the documentation:

> Suppose you are developing a website and creating Atom feeds. You decide to use a third party library. It's difficult to customize the library and deploy it. Submodules addresses this by keeping the library repository as subdirectory of your project.

Submodules allow you to keep a repository as a subdirectory of another repository. You could clone the library and make your changes, confident that it can be deployed later. Newer package managers like RubyGems, Go Modules can build directly from forges. Submodules are redundant in such tech stacks.

Another use case is splitting very large projects into submodules. [Boost](https://github.com/boostorg/boost), a collection of high quality C++ libraries manages individual libraries as an submodule. This reduces the cost of initial clone, ensures relevant updates and has a seperate community around each interest.

> Subtrees also attempt to solve the problems as submodules in a more accessible way. [Read about their differences](https://www.atlassian.com/git/tutorials/git-subtree).

### Use worktrees instead of mutliple clones
\\
While working on websites - I need to compare the behavior of my changes with master. Constantly switching branches for each new tab adds a mental overhead.

_Worktrees_ allow you to create an extra copy of your repository. The changes are synced between worktrees. They are better and more efficient than managing mutliple clones. If you want to checkout two branches at once - worktrees solve this itch.

Some other use cases for worktree are fixing merge conflicts (you can navigate source code by checking out master) and running large test suites locally.

> Here's an article on [parellizing development using git worktrees](https://spin.atomicobject.com/2016/06/26/parallelize-development-git-worktrees/).

### Conclusion
\\
Before I knew about _git grep_, I used to open up firefox, go to the repository and use github's search feature. It was - you might expect, terribly inefficient. Learning these features taught me to become a more thoughtful, a more productive developer.

Learning more about the tools we use - programming languages, IDEs, VCS is essential to improve as a developer.

### Further Reading
\\
Some more handy topics that didn't really fit in:
1. [git grep](https://git-scm.com/docs/git-grep) - Fast text search for tracked files.
2. [Git mailing list](https://public-inbox.org/git/) - Where all the _cool kids_ hangout.
3. [Git best practices](https://sethrobertson.github.io/GitBestPractices/).
4. [10 Git anti patterns](https://speakerdeck.com/lemiorhan/10-git-anti-patterns-you-should-be-aware-of).
