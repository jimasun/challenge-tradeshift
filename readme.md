#Living through the challenge

In this file I'm going to describe my process which is going to be structured similar to a journal.

##Task description

Write a program that will determine the type of a triangle. It should take the lengths of the triangle's three sides as input, and return whether the triangle is equilateral, isosceles or scalene.

We are looking for solutions that showcase problem solving skills and structural considerations that can be applied to larger and potentially more complex problem domains. Pay special attention to tests, readability of code and error cases.

It would be great if you build the UI with our components: http://ui.tradeshift.com/ & https://github.com/Tradeshift/tradeshift-ui
The way you reflect upon your decisions is important to us, why we ask you to include a brief discussion of your design decisions and implementation choices.

The resulting code and discussion is vital for us and will be used as a way for us to validate your engineering skills. After having reviewed your code, we’ll decide on next step.

Please put the solution up on GitHub and send the link to me. If you have some other code that you are proud of then please send that too.

##Discussion

###Setup

I have aimed to have a setup which requires a minimum intervention in the sense that everything should be automated from the point of writing code to delivery. This is why you see integration with `git` for scm and collaboration, `webpack` for bundling, `babel` for transpiling ES6+ syntax and `eslint` for keeping the code tidy especially when working in a team. One cal live without but automation saves lots of time and more important, it keeps away from human-error.

###Code

I have aimed to keep things clean with good separation of concerns and use of ES `modules`. I am still learning about functional JS though.

As for the `Triangle` module, I could have written it as a `class`, with constroctor and properties which would hold the values of the sides as well as things such as `error` and `message`, etc.

The `Ui` module is separated of knowledge about triangle even though it is heighly dependent on it. I like it this way because changes to the UI should not affect how triangles are being calculated and vice versa. Of course there might be cases where requirements would demand changes on both sides. In the current scenario, the triangle functionality could even move the a remote server, with small adaptation.

`drawTriangles` is a WIP but I wanted to have an image there anyway.

###Test

I have choosen `ava` because it was easy to setup. Jasmine/Jest were consider and even though I like the BDD style of tests better using the `describe` I have decided to go with `ava`. It uses `babel` under the hood and I am using `esm` for it to support `import`/`export`.

I have focused only on the `Triangle` module trying to cover all possible scenarios for the 3 public methods that I wrote. An improvement for larger scale is to test all methods.

For larger applicatins, writing UI tests could be cosidered based on available resources. Writing an UI based on components would greately benefit the test coverage.

I have mostly used `assert` but I also employed `spy` (even though there is something not functioniing I have decided to leave the code as an example).


###Conclusions

It is not perfect but I am excited to receive your feedback and learn more. If I would work in a team I would certanly draw inspiration from other coders.
