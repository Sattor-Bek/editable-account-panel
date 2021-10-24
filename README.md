# editable-account-panel

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```
### Process
## First step - Basic functionalities
At first, in order to implement the basic functions, I used Vuetify as UI framework.
I implemented the following functions
- Editing functions with validations
- Profile picture fetching function using Gravatar and md5
- Password safety score evaluations using "zxcvbn"
## Second step - Building design
After implementing basic functions, I erased the Vuetify, after confirming that I should not use the UI framework.
Regarding the design, I kept it as simple as possible, but at the same time, I put effort on taking balance of size and color.

- Basic design
I kept the design simple, the profile card contains the title, image, user name field, email field, and buttons to open forms.
It was hard to think about the best design and I would like to have opinions of the hiring team.
I separated forms for each items: user name, email address, and password, because as a user, I rarely modify my user profile data and when I change it I change only one item, it can be password, it can be email address, not everything at once.

- Color pallet
I chose three colors from color palet from colorhunt (https://colorhunt.co/palette/22577a38a3a557cc9980ed99), it reminds me of the Virtusize logo.

- Changeable icons
There is an "edit" button. When a user pushes the it, it opens a form, and the icon itself turns to a "close" icon.

- Validation
When a user inputs invalid data on the form, the input border turns red and error message appears

- Transition
I put a bit more effort on making the movement of the modal and snackbar smoother.

