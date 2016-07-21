
        $().ready(function() 
        {
            if (autoRefresh != null && autoRefresh && sessTimeoutExpire > 0)
            {
                jsTimeoutNotify = setTimeout("AutoSessionRefresh()", sessTimeoutNotify );
            }   // if
            else
            {
                if (sessTimeoutExpire > 0)
                { 
                    jsTimeoutNotify = setTimeout("TimeoutNotifaction()", sessTimeoutNotify );
                    jsTimeoutExpire = setTimeout("TimeoutExpiration()", sessTimeoutExpire );
                }   // if
            }   // else
            
        });        
        
        // Displays the timeout notification overlay and prompts for extension choice
        function TimeoutNotifaction()
        {
            $.openModal({ target: '#session-warning', width: '400px' });
            
        }   // TimeoutNotifaction()   
        
        // Called when user chooses "Yes" to extend their session
        // Calls the session refresh function and hides the timeout notification overlay
        function TimeoutNotificationYes()
        {
            SessionRefresh();
            $.closeModal({ target: '#session-warning' })
            return false;
            
        }   // TimeoutNotificationYes()
        
        // Make an ajax call to a page that will end the session in case it still exists?
        // Displays the session expiration notifying the user that their session has expired
        function TimeoutExpiration()
        {
            $.closeModal({ target: '#session-warning', overlayHideSpeed: 200, modalHideSpeed: 200, onHide: function () {
                $.openModal({ target: '#session-expiration', width: '400px' });
                $.post("/SessionEnd.aspx");
            } 
            });
            
        }   // TimeoutExpiration()
        
        // Refreshes the session of the user by calling a page, by ajax, that makes a server call
        // If the ajax call returns no data, the session expiration function is called
        function SessionRefresh() 
        {  
            clearTimeout(jsTimeoutExpire);
            
            $.post("/SessionRefresh.aspx", null,    
                function(data) {       
                    if(data == "refresh") 
                    {        
                        jsTimeoutNotify = setTimeout("TimeoutNotifaction()", sessTimeoutNotify );
                        jsTimeoutExpire = setTimeout("TimeoutExpiration()", sessTimeoutExpire );
                    }   // if    
                    else 
                    { 
                        TimeoutExpiration();
                    }    // else
                }   // function(data)
            );  // $.post
            
        }   // SessionRefresh()
        
        function AutoSessionRefresh() 
        {  
            clearTimeout(jsTimeoutNotify);
            
            $.post("/SessionRefresh.aspx", null,    
                function(data) {       
                    if(data == "refresh") 
                    {        
                        jsTimeoutNotify = setTimeout("AutoSessionRefresh()", sessTimeoutNotify );
                    }   // if    
                }   // function(data)
            );  // $.post

        }   // AutoSessionRefresh()
        
