const test1 = <div>    AAA        BBB     </div>;
// extra whitespaces should be removed

const test2 = <div>  {"    CCC    "}      {"    DDD    "}     </div>;
// extra whitespace should not be removed from expression container

const test3 = <div>  {"    EEE    "}   FFF   {"    GGG    "}     </div>;
// extra whitespace should not be removed from expression container

const test4 = <div>    {count()}     </div>;
// single expression

const test5 = <div>    HHH    {heading}    III    </div>;
// few texts before expression

const test6 = <div> {/** */} </div>
// comments should be removed

const test7 = <div> {/** */} {/** */} {/** */} {/** */} {foo()} </div>
// comments should be removed

const test8 = <div> JJJ {'KKK'} {/* x */} {/* x */} {`LLL`}  MMM  {100}  {null} {true} {undefined} {/* x */}  NNN   {hello}    OOO    </div>;
// stringifiable expressions before actual expression

const test9 = <div>   {'    '}    PPP{'    '} </div>
// expression container touches the text

const test10 = <div>   {'    '}    QQQ    {'    '} </div>
// expression container whitespace away from the text (this middle whitespace should be respected)

const test11 = <div> {x} {y} {/* x */} {/* x */} {z} {p}  </div>
// multiple expressions

const test12 = <div> AAA {true} {x} BBB {null} {100} {/* x */} {undefined} {y} {null}  {null}  {null} {z} {p}  </div>
// multiple expressions and multiple texts