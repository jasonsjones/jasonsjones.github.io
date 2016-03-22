---
layout: blog_post
title:  "Using Git to Push to Production"
author: Jason Jones
categories: development
comments: false
---

I've been using git as my version control system for several years now.  In fact, it is
the only version control system I have ever used with any regularity.  My typical use case in the
past had been mainly focused on ensuring my local repositories were version controlled, basically
that I had the ability to 'roll back' to previous versions, if necessary.  I also use Github
regularly to ensure my code stays in sync between the various workstations I may be using to
develop.  I mainly develop on my workstation at home, and occasionally use a chromebook when I'm
away from my home workstation. When I'm away from home, either on the road or at work
(Shhhh...don't tell my boss), I use the cloud9 IDE, which is an awesome cloud based development
environment and very well may be a future blog post topic.  Git (and Github) ensures the code
stays in sync between the various machines, which is exactly what it is intended to do.

### The Problem
Since none of the projects have had any use other than on my local development computers, I hadn't
had the need to configure any remote repositories, other than github, that is until recently...
In an effort to understand the process from development to production, I decided to host a
full-stack project that I had been working on on a digitalocean droplet.  Before I get to the
punchline of this post, I think it may be useful to show you how I was getting code on the
production server (the digitalocean droplet).  Actually, I'm a little embarrassed to the share,
but the workflow went something like this:

#### Previous Workflow
1. Make local changes on a development workstation
2. Commit changes and push commit to the github repository with `git push origin master`, which
was the only remote repository configured for the project.
3. Then gain remote access to the digitalocean droplet via an ssh connection and log in to the
digitalocean droplet.
4. Navigate the project directory, which was previously set up with a
`git clone git@github.com:username/repo`, and do a `git pull` to pull down the latest changes
that were just pushed to github in step 2.

After doing this several times, I knew there had to be a better way to do this than firing
up another terminal window and getting remote access to the digitalocean droplet and pulling down
the changes by hand.  After a little research, I learned that my intuition was correct--there
is in fact a better way to synchronize changes to the production server.

### The Solution
The solution is simple: set up a bare git repository on the production server and *push* the changes
to that repo just as you would do to Github.  The following covers how I set up this environment
on a digitalocean droplet.

#### On the Production Server
First, we will need to initialize a bare git repository on the production server.

{% highlight bash %}
$ cd to/where/you/want/the/repo
$ mkdir repoDir && cd repoDir
$ mkdir theSite.git && cd theSite.git
$ git init --bare
{% endhighlight %}

`--bare` creates a bare repository, which will not include any of the source files; it will only
contain _theSite_ git version control tree.

When the repository is created with `git init --bare`, several directories and files are created,
one which is the `hooks` directory.  This directory contains some sample files for possible actions
that you can hook and perform user-defined custom actions.

According to the git documentation, hooks are little scripts that you can use to trigger action
at certain points.

There are three possible server hooks: _'pre-receive'_, _'post-receive'_, and _'post-update'_

For this task, we will focus on the _post-receive_ hook.  From the git man page, this hook is
invoked on the remote repository when a `git push` is done on a local repository.  It executes on
the remote repository once after all the refs have been updated.

So fire up your favorite text editor and create a file called _post-receive_ with the following
contents:

{% highlight bash %}
#!/bin/bash
git --work-tree=$HOME/location/of/the/project --git-dir=$HOME/location/of/repo/theSite.git checkout -f
{% endhighlight %}

Basically, this script tells the `--work-tree` directory to update the source files located within
with the changes that was just pushed to the `--git-dir` repository.  This ensures the
source directory that is serving the production code is in sync with the git repository that
receives the updates from the your local development machine.  We will set up the local development
machine in the next section.

Once the file is saved, make sure the script is executable.  To do this, simply run the below
command at the command line

{% highlight bash %}
$ chmod u+x post-receive
{% endhighlight %}

#### On Local Development Workstation

Now let's configure the local development machine to be able to push to the production server to
kick off the script.  We need to tell the local repository about the new remote repository.  Simply
set up the remote repository just as you would any other remote repository in git.  Open up a
terminal and issue the following command:

{% highlight bash %}
$ git remote add production user@domain.com:location/of/repo/theSite.git
{% endhighlight %}

Here, we call the remote repository `production`
