new Firebase('https://foreverpets0917-19425.firebaseio.com/dogs').child('breed').update({
   // replace the widgets
   German Shepherd: {
      Activity: '',
      Cost: '',
	  Description: '',
	  Grooming: ''
      History: '',
      Housing: '',
      LifeSpan: '',
      Nutrition: '',
      Size: '',
      Temperment: '',
		
   },

  // reset the count
   widgetCount: 0,

  // delete my status
   status: null
});