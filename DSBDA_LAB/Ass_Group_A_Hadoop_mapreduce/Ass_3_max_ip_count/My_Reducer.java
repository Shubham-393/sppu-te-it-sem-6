/*package wcount;

import java.io.IOException;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;

public class My_Reducer extends Reducer<Text,IntWritable,Text,IntWritable>{
	public void reduce(Text key,Iterable<IntWritable>values,Context context) throws IOException,InterruptedException{

		int sum=0;
		for(IntWritable val:values){
			sum+=val.get();
		}
		context.write(key,new IntWritable(sum));
	}

}
*/

package wcount;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

import org.apache.hadoop.io.IntWritable;
import org.apache.hadoop.io.Text;
import org.apache.hadoop.mapreduce.Reducer;

public class My_Reducer extends Reducer<Text, IntWritable, Text, IntWritable> {

    private Map<String, Integer> ipCountMap = new HashMap<>();

    @Override
    public void reduce(Text key, Iterable<IntWritable> values, Context context)
            throws IOException, InterruptedException {
        int sum = 0;
        for (IntWritable val : values) {
            sum += val.get();
        }

        ipCountMap.put(key.toString(), sum);  // Store in memory
    }

    @Override
    protected void cleanup(Context context) throws IOException, InterruptedException {
        // Find max
        String maxIp = null;
        int maxCount = 0;

        for (Map.Entry<String, Integer> entry : ipCountMap.entrySet()) {
            if (entry.getValue() > maxCount) {
                maxCount = entry.getValue();
                maxIp = entry.getKey();
            }
        }

        if (maxIp != null) {
            context.write(new Text(maxIp), new IntWritable(maxCount));
        }
    }
}
