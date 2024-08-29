## Post mortem of automated Cypress testing

This document is a summary of the steps I went through while working on the
Cypress automated test suite. It serves to document each avenue I tried, the things
that went wrong, and what to try in the future.

---

## Table of contents
1. [Lando and GH actions](#method1) 
2. [Docker Compose](#method2) 
3. [Activity script on Platform.sh](#method3) 
4. [Post-deploy hook on Platform.sh](#method4) 

## Lando and GH actions <a name="method1"></a>

ABOUT:

Lando in general is a good way to quickly spin up a Drupal site. Since it
already works well for local development, it is reasonably easy to set up as
part of a CI/CD pipeline. The most difficult part of the process was figuring
out the things that needed to be installed during the GitHub Action, but I
reached the point where the action could run tests upon pushing to a branch,
including admin tests (using drush uli). For an automated solution, this is one
of the better ones.

PROS:

1. I actually got it working at one point (better than the other options)
2. Easy to read & understand the automation setup
3. Basically all of the necessary configuration/setup is in one place (besides 
the environment variables stored on GH)

CONS:

1. There was an unresolved error potentially caused by the wrong Lando
installation, which would cause a crash on the `lando drush si` step. This
issue was partially solved by running both `lando start` and `lando rebuild -y`,
but this solution is inelegant and time-consuming.
2. The entire process takes quite a while to run (5-8 minutes with comparatively
few tests) so this solution isn't scalable - a large test suite would take a
long time to run.

COMPLETENESS/RECOMMENDATION:

7-8/10. This option is the main option I recommend diving into to get things automated.

RESOURCES:

[Here is the action](https://github.com/ubc-web-services/example.it.ubc.ca/blob/new-cypress/.github/workflows/cypress.yml) 
to run Cypress tests on a new Lando site. You can also take a look at
[the cypress config file](https://github.com/ubc-web-services/example.it.ubc.ca/blob/new-cypress/cypress.config.js).

## Docker Compose <a name="method2"></a>

ABOUT:

I tried switching to Docker Compose (while still using GitHub
Actions) to try solving the above Lando-method issues. The reasoning was that
Docker was an order of abstraction lower than Lando, so it would spin up faster,
improving the slow performance. I chose to focus on using Docker4Drupal, since
that is what the Drupal docs recommend for Docker Compose (although their
recommended setup for local dev is Lando/DDEV).

However, I was unable to create a working solution using this approach. Docker
Compose reveals components of the setup that are hard to reason about (at least
for me; things like traefik or nginx), and so when things went wrong, it was
difficult to figure out the issues. Also, using drush with this setup is harder,
due to the separation between the host computer and Docker container. These
issues, together with the added subtleties of running through GitHub Actions,
made progress very slow. Long term maintenance would also be challenging with
this approach: the developers on our team do not regularly use Docker Compose,
so any breaking changes would be very difficult to debug.

For these reasons, I do not recommend trying to use Docker Compose for
automation purposes. Either use Lando, or a site hosted on Platform.sh (or
a different option that I haven't heard of).

PROS:
1. More control over the parts that make up the local dev stack.
2. It's local, so we can use drush.

CONS:
1. Very hard to reason with - everything felt like I was hacking a solution.
2. Probably unmaintainable long-term without a DevOps specialist on the team.
3. Didn't ever end up working with the Cypress tests - hard enough just to spin up the stack
on GitHub Actions.

COMPLETENESS/RECOMMENDATION:
4/10. Would not recommend this approach! (Unless you are good at Docker/DevOps)

RESOURCES:

[Here](https://wodby.com/docs/1.0/stacks/drupal/local/) is the documentation
for Docker4Drupal by Wodby.

## Activity script on Platform.sh <a name="method3"></a>

If the first option is the best route for testing on a local site, this approach
is (probably) the best for testing off of a deployed site. The blog post linked
above is very useful as a walkthrough on how to set up each part of the pipeline
(GH Actions, Platform.sh activity script). The blog's environment also happens
to match our team's env quite nicely, which makes it one of the most applicable
resources for this project.

There are a few (resolvable) issues with this approach. The first is creating a
new login method - since our P.sh environments all use the team's actual admin
credentials, there needs to be a new way to login as admin to the testing
environment. This can be through secret environment variables, making a new
admin account during testing, or another option.

Another issue is the sometimes odd behavior of the activity script. This is
arguably the least reliable portion of this method. However, with a bit more
familiarity with the Platform API, I believe this would become less of an issue.
This could also be solved by finding a different method of triggering the GH
Action (e.g. running a script in the post deploy hook to send a curl request).

PROS:
1. A tutorial exists already for this approach, which is similar to our work environment!

CONS:
1. The necessary configuration is a bit scattered (e.g. activity script, GH Action script, env vars, etc)
2. Activity script can be unreliable (although could be improved upon theoretically)

COMPLETENESS/RECOMMENDATION:

6.5/10. If the first option doesn't work I would look into this option. Consider also using the
staging branch instead of the PR branch stuff (which might simplify things)

RESOURCES:

This method was based on [this article](https://dev.to/mattbloomfield/automate-pull-request-testing-using-cypress-dashboard-github-actions-and-platform-sh-22m).

## Post-deploy hook on Platform.sh <a name="method4"></a>

This method essentially tries to run the Cypress tests through Platform.sh's
post deploy hook. The idea was that keeping everything running within the same
build/deploy process would make things easier. Unfortunately, Platform does not
support Cypress, and there were many errors involving dependencies like xvfb.
While it's theoretically possible to hack a solution, this would involve
entirely changing .platform.app.yaml, which is excessive. I would not recommend
this approach.

PROS:

1. None really

CONS:

1. Complicated!!!
2. Would completely rewrite the .platform.app.yaml deploy process, which is not great.
3. Didn't even come close to working.

COMPLETENESS/RECOMMENDATION:

0/10. Do this approach at your own peril.

RESOURCES:

Here is the support ticket I opened while trying this method:
[https://support.platform.sh/hc/en-us/requests/307790](https://support.platform.sh/hc/en-us/requests/307790)
