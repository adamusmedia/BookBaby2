function catalogRequest()
	{
			
		var publishing_goals=document.catalogRequestForm.publishing_goals
		var book_genre=document.catalogRequestForm.book_genre
		var kind_of_book=document.catalogRequestForm.kind_of_book
		var manuscript=document.catalogRequestForm.manuscript
		var name=document.catalogRequestForm.name
		var phone=document.catalogRequestForm.phone
		var email=document.catalogRequestForm.email
		
		
		
		if ((publishing_goal.value==null)||(publishing_goal.value==""))
		{
			alert("Please select a publishing goal.")
			publishing_goal.focus()
			return false
		}
		
		if ((book_genre.value==null)||(book_genre.value==""))
		{
			alert("Please select a genre that best describes your book.")
			book_genre.focus()
			return false
		}
		
		if ((kind_of_book.value==null)||(kind_of_book.value==""))
		{
			alert("Please select what kind of book you are making.")
			kind_of_book.focus()
			return false
		}
		
		if ((manuscript.value==null)||(manuscript.value==""))
		{
			alert("Please select when your manuscript will be ready.")
			manuscript.focus()
			return false
		}
		
		if ((contact_time.value==null)||(contact_time.value==""))
		{
			alert("Please select a time to contact you.")
			contact_time.focus()
			return false
		}
		
		if ((name.value==null)||(name.value==""))
		{
			alert("Please enter your name.")
			name.focus()
			return false
		}
		
		if ((phone.value==null)||(phone.value==""))
		{
			alert("Please enter your phone number.")
			phone.focus()
			return false
		}
		
		if ((email.value==null)||(email.value==""))
		{
			alert("Please enter your email address")
			email.focus()
			return false
		}
		if (echeck(email.value)==false)
		{
			email.focus()
			return false
		}
		return true
	}
