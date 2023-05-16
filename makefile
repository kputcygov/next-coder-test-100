REPORTER = spec

test:
	./node_modules/.bin/mocha -r esm --exit --reporter $(REPORTER) --ui bdd

.PHONY: test
