<?php include('header.php') ?>
<?php include('data.php') ?>


<div id="calendar" data-year="<?= date('Y') ?>"  data-month="<?= date('m') ?>">
  <div id="header">
    <?= date('Y') ?>/<?= date('m') ?>
  </div>

  <div id="days" class="clearfix">
    <div class="day">Sun</div>
    <div class="day">MON</div>
    <div class="day">TUE</div>
    <div class="day">WED</div>
    <div class="day">THU</div>
    <div class="day">FRI</div>
    <div class="day">SAT</div>
  </div>

  <div id="dates" class="clearfix">
    <?php foreach ($dates as $key => $date): ?>
      <div class="date-block <?= (is_null($date))? 'empty' : '' ?>" data-date="<?= $date ?>">
        <div class="date"><?= $date ?></div>
        <div class="events">
          <div class="event clearfix">
            <div class="title">title</div>
            <div class="from">10:00</div>
          </div>
        </div>
      </div>
    <?php endforeach ?>
  
  </div>

</div>

<div id="info-panel" class="update" >
  <div class="close">x</div>
  <div class="title">
    <label>event</label>
    <div contenteditable="true"></div>
  </div>
  <div class="time-picker">
    <div class="selected-date">
      <span class="month"></span>/<span class="date"></span>
    </div>
    <div class="from">
      <label for="from">from</label><br>
      <input id="from" type="time" id="start_time">
    </div>
    <div class="to">
      <label for="to">to</label><br>
      <input id="to" type="time" id="start_time">
    </div>
  </div>
  <div class="description">
    <label>description</label><br>
    <textarea name="description" id="description"></textarea>
  </div>
  <div class="buttons clearfix">
    <!-- use css to do 2 cases -->
    <button class="create">create</button>
    <button class="update">udpate</button>
    <button class="cancel">cancel</button>
    <button class="delete">delete</button>
    <!-- create: create / cancel -->
    <!-- update: update / cancel / delete -->
  </div>
</div>

  
<?php include('footer.php') ?>
