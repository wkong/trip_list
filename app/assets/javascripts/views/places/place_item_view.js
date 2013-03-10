TripList.Views.PlaceItemView = Marionette.ItemView.extend({

  model: TripList.Models.Place,
  template: JST['places/place'],
  className: 'main-box',

  events: {
    'change input': 'update'
  },

  initialize: function() {
    _.bindAll(this, 'render', 'removeFromScreen');
    this.model.on('change', this.render, this);
  },

  render: function() {
    return this.$el.append(this.template(this.model));
  },

  removeFromScreen: function() {
    if (this.model.get('isCompleted')) {
      console.log("Removing model from screen");
      this.$el.fadeOut();
      TripList.vent.trigger("redrawPage");
    }
  },

  update: function() {
    console.log("updating model.", this.model);
    this.model.save({ isCompleted: !(this.model.get('isCompleted'))});
    this.removeFromScreen();
  }

});
