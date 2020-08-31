class HifdhInformator {
    constructor(pagesofbook, daysToFinish, startPoint) {
        this.p = pagesofbook;
        this.s = startPoint;
        this.d = daysToFinish;
        this.xStartPoint = (this.d * (-4 * this.p + Math.sqrt(this.p * (this.p + 15 * this.s)) 
        + 4 * Math.sqrt(this.p * (17 * this.p + 15 * this.s - 8 * Math.sqrt(this.p * (this.p + 15 * this.s))))))
            / (17 * this.p + 15 * this.s - 8 * Math.sqrt(this.p * this.p + 15 * this.p * this.s)) - this.d;
    }

    getF(x) {
        let x1 = (this.d * (-this.p + Math.sqrt(this.p * (15 * this.s + this.p)))) / (3 * this.p);
        let result = (3 * this.p / (5 * this.d * this.d)) * Math.pow((x * (1 - (x1 / this.d))), 2) + (2 * this.p / (5 * this.d)) * (x * (1 - (x1 / this.d)));
        return result;
    }

    getdF(x, getPage = false) {
        let currentPage = this.getF(x);
        // let currentDay = Math.round(x - (max-daysToFinish));
        let result = getPage ? currentPage : (2 * x * Math.pow((4 * this.p - Math.sqrt(this.p * (this.p + 15 * this.s))), 2) + 2 * this.p * this.d * 
        (4 * this.p - Math.sqrt(this.p * (this.p + 15 * this.s))))
            / (15 * this.p * this.d * this.d);
        if (currentPage > this.p) {
            return 0
        } else {
            return result;
        }

    }

    summation(n) {
        return (1 / 2) * n * (n + 1);
    }

    roundTo(num, decimals) {
        return Math.round(num * Math.pow(10, decimals) + Number.EPSILON) / Math.pow(10, decimals);
    }

    getRevision(x) {
        //sum[0] contient le nombre de pages apprises à réviser. Son total redonne le nombre à réviser ajd. sum[1] contient le numéro des pages correspondant.
        // donc sum[1][x]-sum[0][x] jusqu'à sum[1][x] est l'intervalle à réviser pour la partie x dans sum
        let sum = [[], []];
        let resultArray = [];
        let a = 20, c = 8, d = 16,   //c et d valent en vrai 1 de moin
            k = d - c,
            o = this.summation(d) - this.summation(c - 1) + a;

        x += this.xStartPoint;

        for (let j = 1; j < x + 1; j++) {
            if (j >= o + d) {
                let result = j - (o + d) + 1;
                resultArray.push(result);
            }
            if (j > x - a) {
                sum[0].push(this.getdF(j));
                sum[1].push(this.getdF(j, true));
                // console.log('a', j);
            }
            for (let p = 0; p <= k; p++) {
                let h = (1 / 2) * (p + 1) * (2 * c + p);
                if (x === a - 1 + j + h) {
                    sum[0].push(this.getdF(j));
                    sum[1].push(this.getdF(j, true));
                }
            }
        }
        while (resultArray.length > 0) {
            // console.log("ra",resultArray)
            sum[0].push(this.getdF(resultArray[resultArray.length - 1]));
            sum[1].push(this.getdF(resultArray[resultArray.length - 1], true));
            resultArray.splice(-d, d);
        }

        // sum.sort((a, b) => a - b);
        return sum;
    }

    getAverageRevision(start, end) {
        let revisionArray = [];
        for (let x = start, step=((end-start)/30); x < end; x += step) {
            revisionArray.push(
                    this.getRevision(x)[0]
                        .reduce((a, b) => a + b, 0)
                    
            );
        }
        return revisionArray.length!== 0 ? Math.round(revisionArray.reduce((a, b) => a + b, 0)/revisionArray.length) : null
    }

    getAverageMemorization(start, end, longPeriod=true){
        start+=this.xStartPoint;
        end+=this.xStartPoint;
        // console.log(`start:`,start);
        // console.log(`end:`,end);
        let memorizationArray = [];
        for (let x = start, step=((end-start)/30); x < end; x += step) {
            memorizationArray.push(
                    this.getdF(x)
            );
        }
        return memorizationArray.length!== 0 ? this.roundTo(memorizationArray.reduce((a, b) => a + b, 0)*(longPeriod?7:1)/memorizationArray.length,1) : null
    }

}

export default HifdhInformator;
// for (let x = 0; x < daysToFinish+200; x += 10) {
//   console.log(x + startPoint, ": (", Math.round(getF(x)) > pagesofbook ? pagesofbook : Math.round(getF(x)), ")",
//     roundTo(
//       getRevision(x)[0]
//         .reduce((a, b) => a + b, 0)
//     ,0)
//   );
// }

