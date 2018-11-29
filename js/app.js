'use strict';

function Horn(horn) {
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
}

Horn.allHorns = [];

Horn.prototype.render = function() {
  $('main').append('<div class="clone"></div');
  let hornClone = $('div[class="clone"]');
  let hornHtml = $('#photo-template').html();
  hornClone.html(hornHtml);

  hornClone.find('h2').text(this.title);
  hornClone.find('img').attr('src', this.image_url);
  hornClone.find('img').attr('alt', this.title);
  hornClone.find('p').text(this.description);
  hornClone.removeClass('clone');
  hornClone.attr('class', this.title);
};

Horn.readJson = () => {
  $.get('./data/page-1.json', 'json')
    .then(data => {
      data.forEach(obj => {
        Horn.allHorns.push(new Horn(obj));
      });
    })
    .then(Horn.loadHorns);
};

function populateDropDown() {

  $.getJSON('/getData.aspx', { Name:$('#parm').val()}, function(data) {

    var select = $('#DDLControl');
    var options = select.attr('options');
    $('option', select).remove();

    $.each(data, function(index, array) {
      options[options.length] = new Option(array['variety']);
    });

  });

}

$(document).ready(function() {

  populateDropDown();
  $('#DDLchangeData').change(function() {
    populateDropDown();
  });

});

Horn.loadHorns = () => {

  Horn.allHorns.forEach(horn => horn.render());
};

$(() => Horn.readJson());