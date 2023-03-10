$(function () {
  ($.fn.googleMap = function (e) {
    switch (
      ((e = $.extend(
        {
          zoom: 10,
          coords: [48.895651, 2.290569],
          type: "ROADMAP",
          debug: !1,
          langage: "english",
          overviewMapControl: !1,
          streetViewControl: !1,
          scrollwheel: !1,
          mapTypeControl: !1,
        },
        e
      )),
      e.type)
    ) {
      case "ROADMAP":
      case "SATELLITE":
      case "HYBRID":
      case "TERRAIN":
        e.type = google.maps.MapTypeId[e.type];
        break;
      default:
        e.type = google.maps.MapTypeId.ROADMAP;
    }
    return (
      this.each(function () {
        var o = new google.maps.Map(this, {
          zoom: e.zoom,
          center: new google.maps.LatLng(e.coords[0], e.coords[1]),
          mapTypeId: e.type,
          scrollwheel: e.scrollwheel,
          streetViewControl: e.streetViewControl,
          overviewMapControl: e.overviewMapControl,
          mapTypeControl: e.mapTypeControl,
        });
        $(this).data("googleMap", o),
          $(this).data("googleLang", e.langage),
          $(this).data("googleDebug", e.debug),
          $(this).data("googleMarker", new Array()),
          $(this).data("googleBound", new google.maps.LatLngBounds());
      }),
      this
    );
  }),
    ($.fn.addMarker = function (e) {
      return (
        (e = $.extend(
          {
            coords: !1,
            address: !1,
            url: !1,
            id: !1,
            icon: !1,
            draggable: !1,
            title: "",
            text: "",
            success: function () {},
          },
          e
        )),
        this.each(function () {
          if ((($this = $(this)), !$this.data("googleMap")))
            return (
              $this.data("googleDebug") &&
                console.error(
                  "jQuery googleMap : Unable to add a marker where there is no map !"
                ),
              !1
            );
          if (!e.coords && !e.address)
            return (
              $this.data("googleDebug") &&
                console.error(
                  "jQuery googleMap : Unable to add a marker if you don't tell us where !"
                ),
              !1
            );
          if (e.address && "string" == typeof e.address) {
            (function (o) {
              var a = new google.maps.Geocoder();
              a.geocode(
                {
                  address: e.address,
                  bounds: o.data("googleBound"),
                  language: o.data("googleLang"),
                },
                function (a, t) {
                  if (t == google.maps.GeocoderStatus.OK) {
                    if (
                      (o.data("googleBound").extend(a[0].geometry.location),
                      e.icon)
                    )
                      var g = new google.maps.Marker({
                        map: $this.data("googleMap"),
                        position: a[0].geometry.location,
                        title: e.title,
                        icon: e.icon,
                        draggable: e.draggable,
                      });
                    else
                      var g = new google.maps.Marker({
                        map: o.data("googleMap"),
                        position: a[0].geometry.location,
                        title: e.title,
                        draggable: e.draggable,
                      });
                    if (
                      (e.draggable &&
                        google.maps.event.addListener(
                          g,
                          "dragend",
                          function () {
                            var o = g.getPosition(),
                              a = {};
                            (a.lat = o.lat()),
                              (a.lon = o.lng()),
                              e.success(a, $this);
                          }
                        ),
                      "" == e.title || "" == e.text || e.url)
                    )
                      e.url &&
                        google.maps.event.addListener(g, "click", function () {
                          document.location = e.url;
                        });
                    else {
                      var n = new google.maps.InfoWindow({
                          content: "<h1>" + e.title + "</h1>" + e.text,
                        }),
                        r = o.data("googleMap");
                      google.maps.event.addListener(g, "click", function () {
                        n.open(r, g);
                      });
                    }
                    e.id
                      ? (o.data("googleMarker")[e.id] = g)
                      : o.data("googleMarker").push(g),
                      1 == o.data("googleMarker").length
                        ? (o
                            .data("googleMap")
                            .setCenter(a[0].geometry.location),
                          o
                            .data("googleMap")
                            .setZoom(o.data("googleMap").getZoom()))
                        : o.data("googleMap").fitBounds(o.data("googleBound"));
                    var l = {};
                    (l.lat = a[0].geometry.location.lat()),
                      (l.lon = a[0].geometry.location.lng()),
                      e.success(l, $this);
                  } else
                    $this.data("googleDebug") &&
                      console.error(
                        "jQuery googleMap : Unable to find the place asked for the marker (" +
                          t +
                          ")"
                      );
                }
              );
            })($this);
          } else {
            if (
              ($this
                .data("googleBound")
                .extend(new google.maps.LatLng(e.coords[0], e.coords[1])),
              e.icon)
            )
              var o = new google.maps.Marker({
                map: $this.data("googleMap"),
                position: new google.maps.LatLng(e.coords[0], e.coords[1]),
                title: e.title,
                icon: e.icon,
                draggable: e.draggable,
              });
            else
              var o = new google.maps.Marker({
                map: $this.data("googleMap"),
                position: new google.maps.LatLng(e.coords[0], e.coords[1]),
                title: e.title,
                draggable: e.draggable,
              });
            if ("" == e.title || "" == e.text || e.url)
              e.url &&
                google.maps.event.addListener(o, "click", function () {
                  document.location = e.url;
                });
            else {
              var a = new google.maps.InfoWindow({
                  content: "<h1>" + e.title + "</h1>" + e.text,
                }),
                t = $this.data("googleMap");
              google.maps.event.addListener(o, "click", function () {
                a.open(t, o);
              });
            }
            e.draggable &&
              google.maps.event.addListener(o, "dragend", function () {
                var a = o.getPosition(),
                  t = {};
                (t.lat = a.lat()), (t.lon = a.lng()), e.success(t, $this);
              }),
              e.id
                ? ($this.data("googleMarker")[e.id] = o)
                : $this.data("googleMarker").push(o),
              1 == $this.data("googleMarker").length
                ? ($this
                    .data("googleMap")
                    .setCenter(
                      new google.maps.LatLng(e.coords[0], e.coords[1])
                    ),
                  $this
                    .data("googleMap")
                    .setZoom($this.data("googleMap").getZoom()))
                : $this.data("googleMap").fitBounds($this.data("googleBound")),
              e.success({ lat: e.coords[0], lon: e.coords[1] }, $this);
          }
        }),
        this
      );
    }),
    ($.fn.removeMarker = function (e) {
      this.each(function () {
        var o = $(this);
        if (!o.data("googleMap"))
          return (
            o.data("googleDebug") &&
              console.log(
                "jQuery googleMap : Unable to delete a marker where there is no map !"
              ),
            !1
          );
        var a = o.data("googleMarker");
        return "undefined" != typeof a[e]
          ? (a[e].setMap(null),
            o.data("googleDebug") &&
              console.log("jQuery googleMap : marker deleted"),
            !0)
          : (o.data("googleDebug") &&
              console.error(
                "jQuery googleMap : Unable to delete a marker if it not exists !"
              ),
            !1);
      });
    }),
    ($.fn.addWay = function (e) {
      e = $.extend(
        { start: !1, end: !1, step: [], route: !1, langage: "english" },
        e
      );
      var o = new google.maps.DirectionsService({ region: "fr" }),
        a = new google.maps.DirectionsRenderer({
          draggable: !0,
          map: $(this).data("googleMap"),
          panel: document.getElementById(e.route),
          provideTripAlternatives: !0,
        });
      document.getElementById.innerHTML = "";
      var t = [];
      for (var g in e.step) {
        var n;
        (n =
          "object" == typeof e.step[g]
            ? new google.maps.LatLng(e.step[g][0], e.step[g][1])
            : e.step[g]),
          t.push({ location: n, stopover: !0 });
      }
      if ("object" != typeof e.end) {
        (function (g) {
          var n = new google.maps.Geocoder();
          n.geocode(
            {
              address: e.end,
              bounds: g.data("googleBound"),
              language: e.langage,
            },
            function (n, r) {
              if (r == google.maps.GeocoderStatus.OK) {
                var l = {
                  origin: e.start,
                  destination: n[0].geometry.location,
                  travelMode: google.maps.DirectionsTravelMode.DRIVING,
                  region: "fr",
                  waypoints: t,
                };
                o.route(l, function (e, o) {
                  o == google.maps.DirectionsStatus.OK
                    ? a.setDirections(e)
                    : g.data("googleDebug") &&
                      console.error(
                        "jQuery googleMap : Unable to find the place asked for the route (" +
                          e +
                          ")"
                      );
                });
              } else
                g.data("googleDebug") &&
                  console.error("jQuery googleMap : Address not found");
            }
          );
        })($(this));
      } else {
        var r = {
          origin: e.start,
          destination: new google.maps.LatLng(e.end[0], e.end[1]),
          travelMode: google.maps.DirectionsTravelMode.DRIVING,
          region: "fr",
          waypoints: t,
        };
        o.route(r, function (e, o) {
          o == google.maps.DirectionsStatus.OK
            ? a.setDirections(e)
            : $(this).data("googleDebug") &&
              console.error("jQuery googleMap : Address not found");
        });
      }
      return this;
    });
});
