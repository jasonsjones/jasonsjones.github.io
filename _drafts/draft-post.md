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
develop.  I mainly develop on my main desktop at home, and occasionally use a chromebook when I'm
away from my home desktop. When I'm away from my desktop, either on the road or at work
(Shhhh...don't tell my boss), I use the cloud9 IDE, which is an awesome cloud based development
environment and very well may be a future blog post topic.  Git (and Github) ensures the code
base stays in sync between the various machines, which is exactly what it is intended to do.

Since none of my projects have had any use other than on my local development computers, I hadn't
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
3. Get remote access to the digitalocean droplet via an ssh connection and log in to the
digitalocean droplet.
4. Navigate the project directory, which was previously set up with a
`git clone git@github.com:username/repo`, and do a `git pull` to pull down the latest changes
that were just pushed to github in step 2.

After doing this several times, I knew there had to be a better way to do this than firing
up another terminal window and getting remote access to the digitalocean droplet and pulling down
the changes by hand.
