<%@ Page Language="C#" AutoEventWireup="true" MasterPageFile="MasterPage.master" CodeFile="Default.aspx.cs" Inherits="Default" %>
<asp:Content runat="server" ContentPlaceHolderID="pageContent">
    
    <div class="container-fluid bg-lt-blue-2">
        <div class="container">
            <div class="row">
                <section class="jumbotron light">
                    <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                        <h1 class="title black no-shadow pt-35 mb-0">Custom book printing comparison chart</h1>
                        <h2 class="subtitle black no-shadow mt-10">Choose from some of our most popular Book packages or <a href="/quoter/default.aspx" class="link-orange">make a book from scratch</a>.</h2>
                        <p><a href="/quoter/default.aspx" class="btn btn-orange btn-center btn-lg mb-30" role="button">Make a book</a></p>
                    </div>
                </section>
            </div>

        </div>
    </div>


    
    
    <div class="container-fluid bg-lt-grey pt-60 pb-60">
        <div class="container">
            <div class="row">






            <div class="table-res mt-20 mb-40">
                
                <table class="table table-bordered res packagecompare">
                    <thead>
                        <tr>
                            <th class="bg-t-blue"><span>Trim Size</span></th>
                            <th class="bg-t-blue"><span>Production Time</span></th>
                            <th class="bg-t-blue"><span>Min. Qty.</span></th>
                            <th class="bg-t-blue"><span>Softcover Binding Styles</span></th>
                            <th class="bg-t-blue"><span>Hardcover Binding Styles</span></th>
                            <th class="bg-t-blue"><span>Highlights</span></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><span><img src="Images/comparison-pocketbook.jpg" width="85" height="59" alt="Pocket Book 4.25 inches x 6.87 inches" title="Pocket Book 4.25 inches x 6.87 inches" class="img-responsive center-block mb-10"></span><p><strong>Pocket Book<br /> 4.25x6.87</strong></p></td>
                            <td><span>5 Days</span></td>
                            <td><span>25</span></td>
                            <td>
                                <span>
                                    <ul class="disc-list">
                                        <li>Perfect Binding</li>
                                        <li>Saddle Stitching</li>
                                        <li>Black Plastic Spiral</li>
                                        <li>Black Plastic Comb</li>
                                    </ul>
                                </span>
                            </td>
                            <td><span>None</span>
                            </td>
                            <td>
                                <span>
                                    <ul class="disc-list">
                                        <li>Popular trim size for genre fiction</li>
                                        <li>Matches well with a natural text paper stock</li>
                                        <li>Choose gloss or matte cover finish</li>
                                      </ul>
                                </span>
                            </td>
                        </tr>

                        
                        <tr>
                            <td><span><img src="Images/comparison-digest.jpg" width="85" height="70" alt="Digest Book 5.5 inches x 8.5 inches" title="Digest Book 5.5 inches x 8.5 inches" class="img-responsive center-block mb-10"></span><p><strong>Digest <br />5.5x8.5</strong></p></td>
                            <td><span>5 Days</span></td>
                            <td><span>25</span></td>
                            <td>
                                <span>
                                    <ul class="disc-list">
                                        <li>Perfect Binding</li>
                                        <li>Saddle Stitching</li>
                                        <li>Black Plastic Spiral</li>
                                        <li>Black Plastic Comb</li>
                                    </ul>
                                </span>
                            </td>
                            <td><span>
                                    <ul class="disc-list">
                                        <li>Adhesive Case Wrap</li>
                                        <li>Additional Hard Case Items:</li>
                                        <li>Dust Jackets</li>
                                        <li>Headbands</li>
                                    </ul>
                                </span>
                            </td>
                            <td>
                                <span>
                                    <ul class="disc-list">
                                        <li>Great for poetry books, science fiction and other topical journals</li>
                                        <li>Matches well with a light weight gloss text stock</li>
                                        <li>Choose gloss or matte cover finish</li>
                                      </ul>
                                </span>
                            </td>
                        </tr>

                        
                        <tr>
                            <td><span><img src="Images/comparison-ustrade.jpg" width="85" height="75" alt="US Trade Book 6 inches x 9 inches" title="US Trade Book 6 inches x 9 inches" class="img-responsive center-block mb-10"></span><p><strong>US Trade <br />6x9</strong></p></td>
                            <td><span>5 Days</span></td>
                            <td><span>25</span></td>
                            <td>
                                <span>
                                    <ul class="disc-list">
                                        <li>Perfect Binding</li>
                                        <li>Saddle Stitching</li>
                                        <li>Black Plastic Spiral</li>
                                        <li>Black Plastic Comb</li>
                                    </ul>
                                </span>
                            </td>
                            <td><span>
                                    <ul class="disc-list">
                                        <li>Adhesive Case Wrap</li>
                                        <li>Additional Hard Case Items:</li>
                                        <li>Dust Jackets</li>
                                        <li>Headbands</li>
                                    </ul>
                                </span>
                            </td>
                            <td>
                                <span>
                                    <ul class="disc-list">
                                        <li>Great for poetry books, science fiction and other topical journals</li>
                                        <li>Matches well with a light weight gloss text stock</li>
                                        <li>Choose gloss or matte cover finish</li>
                                      </ul>
                                </span>
                            </td>
                        </tr>

                        
                        <tr>
                            <td><span><img src="Images/comparison-smallsquare.jpg" width="85" height="63" alt="Small Square Book 7.5 inches x 7.5 inches" title="Small Square Book 7.5 inches x 7.5 inches" class="img-responsive center-block mb-10"></span><p><strong>Small Square <br />7.5x7.5</strong></p></td>
                            <td><span>5 Days</span></td>
                            <td><span>25</span></td>
                            <td>
                                <span>
                                    <ul class="disc-list">
                                        <li>Perfect Binding</li>
                                        <li>Saddle Stitching</li>
                                        <li>Black Plastic Spiral</li>
                                        <li>Black Plastic Comb</li>
                                    </ul>
                                </span>
                            </td>
                            <td><span>None</span>
                            </td>
                            <td>
                                <span>
                                    <ul class="disc-list">
                                        <li>Small squares are popular options for larger format fiction, non-fiction, children's & cooking books.</li>
                                        <li>Choose gloss or matte cover finish.</li>
                                      </ul>
                                </span>
                            </td>
                        </tr>

                        
                        <tr>
                            <td><span><img src="Images/comparison-square.jpg" width="85" height="70" alt="Square Book 8.5 inches x 8.5 inches" title="Square Book 8.5 inches x 8.5 inches" class="img-responsive center-block mb-10"></span><p><strong>Square <br />8.5x8.5</strong></p></td>
                            <td><span>5 Days</span></td>
                            <td><span>25</span></td>
                            <td>
                                <span>
                                    <ul class="disc-list">
                                        <li>Perfect Binding</li>
                                        <li>Saddle Stitching</li>
                                        <li>Black Plastic Spiral</li>
                                        <li>Black Plastic Comb</li>
                                    </ul>
                                </span>
                            </td>
                            <td><span>
                                    <ul class="disc-list">
                                        <li>Adhesive Case Wrap</li>
                                        <li>Additional Hard Case Items:</li>
                                        <li>Dust Jackets</li>
                                        <li>Headbands</li>
                                    </ul>
                                </span>
                            </td>
                            <td>
                                <span>
                                    <ul class="disc-list">
                                        <li>Large Square are popular options for non-fiction, photography, children's & cooking books</li>
                                        <li>Popular hardcover size</li>
                                        <li>Looks great with a dust jacket</li>
                                        <li>Choose gloss or matte cover finish</li>
                                      </ul>
                                </span>
                            </td>
                        </tr>

                        
                        <tr>
                            <td><span><img src="Images/comparison-landscape.jpg" width="90" height="66" alt="Landscape Book 9 inches x 7 inches" title="Landscape Book 9 inches x 7 inches" class="img-responsive center-block mb-10"></span><p><strong>Landscape <br />9x7</strong></p></td>
                            <td><span>5 Days</span></td>
                            <td><span>25</span></td>
                            <td>
                                <span>
                                    <ul class="disc-list">
                                        <li>Perfect Binding</li>
                                        <li>Saddle Stitching</li>
                                        <li>Black Plastic Spiral</li>
                                        <li>Black Plastic Comb</li>
                                    </ul>
                                </span>
                            </td>
                            <td><span>
                                    <ul class="disc-list">
                                        <li>Adhesive Case Wrap</li>
                                        <li>Additional Hard Case Items:</li>
                                        <li>Dust Jackets</li>
                                        <li>Headbands</li>
                                    </ul>
                                </span>
                            </td>
                            <td>
                                <span>
                                    <ul class="disc-list">
                                        <li>Landscape books make beautiful art &amp; photography table top books and children's books</li>
                                        <li>Popular option for hard case binding with color text printing on gloss paper stock</li>
                                        <li>Choose gloss or matte cover finish</li>
                                    </ul>
                                </span>
                            </td>
                        </tr>

                        
                        <tr>
                            <td><span><img src="Images/comparison-comicbook.jpg" width="85" height="82" alt="Comic Book 6.625 inches x 10.25 inches" title="Comic Book 6.625 inches x 10.25 inches" class="img-responsive center-block mb-10"></span><p><strong>Cosmic Book <br />6.625x10.25</strong></p></td>
                            <td><span>5 Days</span></td>
                            <td><span>25</span></td>
                            <td>
                                <span>
                                    <ul class="disc-list">
                                        <li>Perfect Binding</li>
                                        <li>Saddle Stitching</li>
                                        <li>Black Plastic Spiral</li>
                                        <li>Black Plastic Comb</li>
                                    </ul>
                                </span>
                            </td>
                            <td><span>None</span>
                            </td>
                            <td>
                                <span>
                                    <ul class="disc-list">
                                        <li>The classic comic book style</li>
                                        <li>Perfect for color printing</li>
                                        <li>Best matches with a 60lb gloss text paper stock</li>
                                    </ul>
                                </span>
                            </td>
                        </tr>

                        
                        <tr>
                            <td><span><img src="Images/comparison-usletter.jpg" width="85" height="88" alt="US Letter 8.5 inches x 11 inches" title="US Letter 8.5 inches x 11 inches" class="img-responsive center-block mb-10"></span><p><strong>US Letter <br />8.5x11</strong></p></td>
                            <td><span>5 Days</span></td>
                            <td><span>25</span></td>
                            <td>
                                <span>
                                    <ul class="disc-list">
                                        <li>Soft Case:</li>
                                        <li>Perfect Binding</li>
                                        <li>Saddle Stitching</li>
                                        <li>Black Plastic Spiral</li>
                                        <li>Black Plastic Comb</li>
                                    </ul>
                                </span>
                            </td>
                            <td><span>
                                    <ul class="disc-list">
                                        <li>Adhesive Case Wrap</li>
                                        <li>Additional Hard Case Items:</li>
                                        <li>Dust Jackets</li>
                                        <li>Headbands</li>
                                    </ul>
                                </span>
                            </td>
                            <td>
                                <span>
                                    <ul class="disc-list">
                                        <li>US Letter size has many uses including text books, art & photography books, children's books, training manuals, cooking books, year books & religious publications</li>
                                        <li>US letter size works great with all binding styles and text paper stock options</li>
                                        <li>Choose gloss or matte cover finish</li>
                                    </ul>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>

                <div class="clearfix"></div>
                <p><a href="/quoter/default.aspx" class="btn btn-orange btn-center btn-lg mb-30" role="button">Make a book</a></p>
            </div>
        </div>
    </div>


    

</asp:Content>
