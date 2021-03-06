/* Copyright 2017 The TensorFlow Authors. All Rights Reserved.

Licensed under the Apache License, Version 2.0 (the 'License');
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an 'AS IS' BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
==============================================================================*/

module tf.graph.op {

  /**
   * Whitelist of current Tensorflow ops valid on the TPU
   */
  export const WHITELIST = [
    'Abs',
    'Add',
    'AddN',
    'All',
    'Any',
    'Assert',
    'AssignAddVariableOp',
    'AssignSubVariableOp',
    'AssignVariableOp',
    'AvgPool',
    'AvgPool3D',
    'AvgPool3DGrad',
    'AvgPoolGrad',
    'BatchMatMul',
    'BatchToSpace',
    'BatchToSpaceND',
    'BiasAdd',
    'BiasAddGrad',
    'BiasAddV1',
    'BroadcastGradientArgs',
    'Cast',
    'Ceil',
    'CheckNumerics',
    'Concat',
    'ConcatOffset',
    'ConcatV2',
    'Const',
    'ControlTrigger',
    'Conv2D',
    'Conv2DBackpropFilter',
    'Conv2DBackpropInput',
    'Conv3D',
    'Conv3DBackpropFilterV2',
    'Conv3DBackpropInputV2',
    'Cos',
    'Cross',
    'CrossReplicaSum',
    'DepthwiseConv2dNative',
    'DepthwiseConv2dNativeBackpropFilter',
    'DepthwiseConv2dNativeBackpropInput',
    'Diag',
    'DiagPart',
    'Div',
    'DynamicStitch',
    'Elu',
    'EluGrad',
    'Empty',
    'Equal',
    'Exp',
    'ExpandDims',
    'Fill',
    'Floor',
    'FloorDiv',
    'FloorMod',
    'FusedBatchNorm',
    'FusedBatchNormGrad',
    'Gather',
    'Greater',
    'GreaterEqual',
    'Identity',
    'InfeedDequeue',
    'InfeedDequeueTuple',
    'InplaceAdd',
    'InplaceUpdate',
    'Inv',
    'InvertPermutation',
    'IsFinite',
    'L2Loss',
    'Less',
    'LessEqual',
    'LinSpace',
    'Log',
    'Log1p',
    'LogicalAnd',
    'LogicalNot',
    'LogicalOr',
    'LogSoftmax',
    'LRN',
    'LRNGrad',
    'MatMul',
    'MatrixDiag',
    'MatrixDiagPart',
    'Max',
    'Maximum',
    'MaxPool',
    'MaxPool3D',
    'MaxPool3DGrad',
    'MaxPoolGrad',
    'Mean',
    'Min',
    'Minimum',
    'MirrorPad',
    'Mod',
    'Mul',
    'Neg',
    'NoOp',
    'NotEqual',
    'OneHot',
    'OnesLike',
    'OutfeedEnqueue',
    'OutfeedEnqueueTuple',
    'Pack',
    'Pad',
    'PadV2',
    'Pow',
    'PreventGradient',
    'Prod',
    'RandomStandardNormal',
    'RandomUniform',
    'RandomUniformInt',
    'Range',
    'Rank',
    'ReadVariableOp',
    'RealDiv',
    'Reciprocal',
    'RecvBarnaCoreActivations',
    'Relu',
    'Relu6',
    'Relu6Grad',
    'ReluGrad',
    'Reshape',
    'ResourceApplyAdagrad',
    'ResourceApplyAdam',
    'ResourceApplyFtrl',
    'ResourceApplyFtrlV2',
    'ResourceApplyGradientDescent',
    'ResourceApplyMomentum',
    'ResourceApplyRMSProp',
    'ResourceGather',
    'ResourceStridedSliceAssign',
    'Reverse',
    'ReverseV2',
    'Round',
    'Rsqrt',
    'RsqrtGrad',
    'Select',
    'Selu',
    'SeluGrad',
    'SendBarnaCoreGradients',
    'Shape',
    'ShapeN',
    'Sigmoid',
    'SigmoidGrad',
    'Sign',
    'Sin',
    'Size',
    'Slice',
    'Softmax',
    'SoftmaxCrossEntropyWithLogits',
    'Softplus',
    'SoftplusGrad',
    'SpaceToBatch',
    'SpaceToBatchND',
    'SparseMatMul',
    'SparseSoftmaxCrossEntropyWithLogits',
    'Split',
    'SplitV',
    'Sqrt',
    'Square',
    'SquaredDifference',
    'Squeeze',
    'StackCloseV2',
    'StackPopV2',
    'StackPushV2',
    'StackV2',
    'StopGradient',
    'StridedSlice',
    'StridedSliceGrad',
    'Sub',
    'Sum',
    'SymbolicGradient',
    'Tanh',
    'TanhGrad',
    'TensorArrayCloseV3',
    'TensorArrayConcatV3',
    'TensorArrayGatherV3',
    'TensorArrayGradV3',
    'TensorArrayReadV3',
    'TensorArrayScatterV3',
    'TensorArraySizeV3',
    'TensorArraySplitV3',
    'TensorArrayV3',
    'TensorArrayWriteV3',
    'Tile',
    'Transpose',
    'TruncateDiv',
    'TruncatedNormal',
    'TruncateMod',
    'Unpack',
    'UnsortedSegmentSum',
    'VarIsInitializedOp',
    'While',
    'XlaWhile',
    'ZerosLike'
  ];

  /**
   * Returns true if OpNode graph object represents a
   * Tensorflow operation that is valid for the TPU.
   *
   * @param opNode OpNode graph object
   * @returns {boolean}
   */
  export function opValid(opNode: OpNode) : boolean {
    // If assigned a device, and it is not the TPU, assume op is valid
    if (opNode.device && opNode.device.toLowerCase().search("tpu") == -1) {
      return true;
    }
    return WHITELIST.indexOf(opNode.op) != -1;
  }

  export function checkOpsForCompatibility(graph: SlimGraph) {
    _.each(graph.nodes, (node) => {
      node.compatible = opValid(node);
      _.each(node.inEmbeddings, (node) => {
        node.compatible = opValid(node);
      });

      _.each(node.outEmbeddings, (node) => {
        node.compatible = opValid(node);
      });
    });
  }

} // close module tf.graph.op
