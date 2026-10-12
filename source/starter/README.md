# Integration helpers
These TypeScript files are small source inputs, not a runnable application. Copy/integrate them into the app's content/lib layer and use actual Next.js types at the boundary. JSON import inference may widen string unions: validate at load time or use explicit typed parsing rather than weakening all types to any. Do not expose launch-config, source documents or review appendix through public/.

All routes can use generateStaticParams for known services/guides and notFound for unknown slugs. Content imports happen server-side. Client components receive only fields needed for interaction, not entire datasets or approval evidence. A Markdown parser should disable raw HTML and support GFM tables. Each page composition entry maps to a component; compose explicitly rather than building an unnecessarily generic CMS engine.

Metadata helper takes a publicReady result from the application's server-only release resolver. Request host/deployment environment also needs to match approved public origin. The separate scripts/check-release.py is a human/CI readiness diagnostic; it must not be substituted for runtime indexing control.
