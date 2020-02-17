class NeuralNetwork {
    constructor() {
        // this.input_nodes = a;
        // this.hidden_nodes = b;
        this.output_nodes = 5;
        this.IMAGE_WIDTH = 50;
        this.IMAGE_HEIGHT = 50;
        this.IMAGE_CHANNELS = 3;
        this.createModel();
    }

    predict(inputs) {
        const xs = tf.tensor2d(inputs);
        const ys =this.model.predict(xs).argMax([-1]);
        const outputs = ys.dataSync();
        console.log(outputs)
        return outputs;
    }

    createModel() {
        this.model = tf.sequential();
        // In the first layer of our convolutional neural network we have 
        // to specify the input shape. Then we specify some parameters for 
        // the convolution operation that takes place in this layer.
        this.model.add(tf.layers.conv2d({
            inputShape: [this.IMAGE_WIDTH, this.IMAGE_HEIGHT, this.IMAGE_CHANNELS],
            kernelSize: 5,
            filters: 8,
            strides: 1,
            activation: 'relu',
            kernelInitializer: 'varianceScaling'
        }));

        // The MaxPooling layer acts as a sort of downsampling using max values
        // in a region instead of averaging.  
        this.model.add(tf.layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }));

        // Repeat another conv2d + maxPooling stack. 
        // Note that we have more filters in the convolution.
        this.model.add(tf.layers.conv2d({
            kernelSize: 5,
            filters: 16,
            strides: 1,
            activation: 'relu',
            kernelInitializer: 'varianceScaling'
        }));
        this.model.add(tf.layers.maxPooling2d({ poolSize: [2, 2], strides: [2, 2] }));

        // Now we flatten the output from the 2D filters into a 1D vector to prepare
        // it for input into our last layer. This is common practice when feeding
        // higher dimensional data to a final classification output layer.
        this.model.add(tf.layers.flatten());

        this.model.add(hidden);
        const output = tf.layers.dense({
            units: this.output_nodes,
            activation: 'softmax'
        });
        
        this.model.add(output);
        // this.model.compile({})
    }


}

// const hidden = tf.layers.dense({
        //     units: this.hidden_nodes,
        //     inputShape: [this.input_nodes],
        //     activation: 'sigmoid'
        // });
        // this.model.add(hidden);
        // const output = tf.layers.dense({
        //     units: this.output_nodes,
        //     activation: 'softmax'
        // });