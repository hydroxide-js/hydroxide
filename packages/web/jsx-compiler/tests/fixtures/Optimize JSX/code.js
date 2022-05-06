const test1 = <div>      hello      </div>
// text

const test2 = <div>    {x}    </div>
// expression only

const test3 =  <div>    {/* before */}    hello    {/* after */}    </div>
// text betwween comments

const test4 = <div>    foo    {/* foo */}    bar    </div>
// comment between texts

const test5 =  <div>    <img />    hello    <p>    foo    </p>    </div>
// whitespace between elements and text

const test6 = <div>    foo    {x}    bar    </div>
// expression between text

const test7 = <div>    {100}    {null}    {undefined}    {'foo'}    {`bar`}    {`hi ${mom}`}    {true}    </div>
// statßic values in expression container
