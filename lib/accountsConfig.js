var postSignUp = function(userId, info) {
  Roles.addUsersToRoles(userId, ['normal-user'], Roles.GLOBAL_GROUP);
}

AccountsTemplates.configure({
    confirmPassword: true,
    enablePasswordChange: true,	
    sendVerificationEmail: true,
    focusFirstInput: true,
    showAddRemoveServices: false,
    showForgotPasswordLink: false,
    showLabels: true,
    showPlaceholders: true,
    showResendVerificationEmailLink: false,
    postSignUpHook: postSignUp,
});
var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      minLength: 5,
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
      re: /.+@(.+){2,}\.(.+){2,}/,
      errStr: 'Invalid email',
  },
  pwd
]);
