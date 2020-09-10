  var getJSON = function(url, callback) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.responseType = 'json';
      xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
          callback(null, xhr.response);
        } else {
          callback(status, xhr.response);
        }
      };
      xhr.send();
  };

  // Public API method
  // -------------------------------------
  // https://www.instagram.com/hounder.co/?__a=1

  var user = 'brechoshowroom';

  var instagramFeed = document.querySelector('#instafeed');

  function getVideo(id){
      fetch(`https://www.instagram.com/p/${id}/?__a=1`)
          .then(function(response) {
              return response.json();
          })
          .then(function(json) {
              instagram_video_url = json.graphql.shortcode_media.video_url;

              var instagram_video = document.querySelector('[data-instagram-video="'+id+'"]');

              instagram_video.setAttribute('src', instagram_video_url); 
          });
  };

  getJSON('https://www.instagram.com/'+user+'/?__a=1',
      function(err, data) {
        if (err !== null) {
              alert('Something went wrong: ' + err);

        } else {

          var instagramItem = data.graphql


          var instagramMedia = instagramItem.user.edge_owner_to_timeline_media.edges;


          var instagram_video_url = '';

          instagramMedia.forEach(function (item, index) {


              if (item.node.is_video == true) {

                  getVideo(item.node.shortcode);

              }

              var imageText = '';
              var instagramLink = '';


              instagramLink = `<a href="https://www.instagram.com/p/${item.node.shortcode}" target="_blank" rel="noopener noreferrer" class="instagram-item" title="Instagram Image">

                  <img src="${item.node.thumbnail_resources[3].src}" style="max-width:${item.node.thumbnail_resources[3].config_width}px;" alt="${imageText}">

                  <div class="instagram-video">
                      <video autoplay muted loop data-instagram-video="${item.node.shortcode}" src="${instagram_video_url}"></video>
                  </div>

                  <span class="instagram-icon"><svg viewBox="0 0 16 16" xmlns="https://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="1.414"><path d="M8 0C5.827 0 5.555.01 4.702.048 3.85.088 3.27.222 2.76.42c-.526.204-.973.478-1.417.923-.445.444-.72.89-.923 1.417-.198.51-.333 1.09-.372 1.942C.008 5.555 0 5.827 0 8s.01 2.445.048 3.298c.04.852.174 1.433.372 1.942.204.526.478.973.923 1.417.444.445.89.72 1.417.923.51.198 1.09.333 1.942.372.853.04 1.125.048 3.298.048s2.445-.01 3.298-.048c.852-.04 1.433-.174 1.942-.372.526-.204.973-.478 1.417-.923.445-.444.72-.89.923-1.417.198-.51.333-1.09.372-1.942.04-.853.048-1.125.048-3.298s-.01-2.445-.048-3.298c-.04-.852-.174-1.433-.372-1.942-.204-.526-.478-.973-.923-1.417-.444-.445-.89-.72-1.417-.923-.51-.198-1.09-.333-1.942-.372C10.445.008 10.173 0 8 0zm0 1.44c2.136 0 2.39.01 3.233.048.78.036 1.203.166 1.485.276.374.145.64.318.92.598.28.28.453.546.598.92.11.282.24.705.276 1.485.038.844.047 1.097.047 3.233s-.01 2.39-.05 3.233c-.04.78-.17 1.203-.28 1.485-.15.374-.32.64-.6.92-.28.28-.55.453-.92.598-.28.11-.71.24-1.49.276-.85.038-1.1.047-3.24.047s-2.39-.01-3.24-.05c-.78-.04-1.21-.17-1.49-.28-.38-.15-.64-.32-.92-.6-.28-.28-.46-.55-.6-.92-.11-.28-.24-.71-.28-1.49-.03-.84-.04-1.1-.04-3.23s.01-2.39.04-3.24c.04-.78.17-1.21.28-1.49.14-.38.32-.64.6-.92.28-.28.54-.46.92-.6.28-.11.7-.24 1.48-.28.85-.03 1.1-.04 3.24-.04zm0 2.452c-2.27 0-4.108 1.84-4.108 4.108 0 2.27 1.84 4.108 4.108 4.108 2.27 0 4.108-1.84 4.108-4.108 0-2.27-1.84-4.108-4.108-4.108zm0 6.775c-1.473 0-2.667-1.194-2.667-2.667 0-1.473 1.194-2.667 2.667-2.667 1.473 0 2.667 1.194 2.667 2.667 0 1.473-1.194 2.667-2.667 2.667zm5.23-6.937c0 .53-.43.96-.96.96s-.96-.43-.96-.96.43-.96.96-.96.96.43.96.96z"></path></svg></span>

                  </a>`;

              instagramFeed.innerHTML += instagramLink;

          });

        }
      });