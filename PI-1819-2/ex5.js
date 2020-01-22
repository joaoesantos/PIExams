//5
//a
/*
path:
/playlists/{id}:
put:
      tags:
        - playlist
      summary: Updates a playlist
      operationId: editPlaylistById
      description: |
        Updates a playlist.

      requestBody:
        description: Playlist body
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/playlist'

      parameters:
        - in: path
          name: id
          description: String representing the playlist id
          required: true
          schema:
            type: string
      responses:
        '200':
          description: object that represents updated playlist
          content:
            application/json:
              schema:
                type: object
                properties:
                  payload:
                    type: object
                    $ref: '#/components/schemas/playlist'
        '400':
          description: Bad request
          content:
            application/json:
              schema:
                type: object
                properties:
                  payload:
                    type: object
                    properties:
                      Error:
                        type: string
                        description: Technical error message.
                        example: Group id must follow uuid standard format.
        '404':
          description: Resource not found
          content:
            application/json:
              schema:
                type: object
                properties:
                  payload:
                    type: object
                    properties:
                      Error:
                        type: string
                        description: Error message to present on application.
                        example: This playlist does not exist.
        '500':
          description: Server error
          content:
            application/json:
              schema:
                type: object
                properties:
                  payload:
                    type: object
                    properties:
                      Error:
                        type: string
                        description: Error message to present on application.
                        example: Internal error, please contact administrator.

components:
  schemas:
    playlist:
    type: object
      required:
        - name
        - description
        - musics
        - owner
      properties:
        name:
          type: string
          example: 'Chill music'
        description:
          type: string
          example: 'Playlist to study'
        games:
          type: array
          items:
            $ref: '#/components/schemas/music'
        owner:
          type: string
          example: 'jsantos1234'
    
    music:
    type: object
        required:
            - name
            - artist
        properties:
            name:
                type: string
                example: 'Music A'
            artist:
                type: string
                example: 'Artist previously knows as Kevin'
*/

//b
async function addMusicToPlaylist(req, resp){
    try{
        let music = req.body;
        music.playlistID = req.params.id;
        let data = await yamaService.addMusicToPlaylist(music);

        resp.setHeader('Content-type', 'application/json')
        resp.statusCode = data.statusCode;
        let payload = { payload: data.body };
        resp.json(payload);
    }catch(err){
        resp.statusCode = err.statusCode;
        let payload = { payload: err.body };
        resp.json(payload);
    }
}

//c
async function addMusicToPlaylist(music){
    try{
        let playlist = await yama-db.getPlaylist(music.playlistID);
        if(playlist.allowMultiple || playlist.musics.indexOf(music) == -1){
            playlist.musics.push(music);
            return await yama-db.updatePlaylist(playlist)
        }else {
            return {statusCode: 403, body:"Musica já existe"};
        }
    }catch(err){
        return {statusCode: 500, body:"Contactar Administrador"};
    }
}